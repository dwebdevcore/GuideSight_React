import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import actions from './actions';
import FirebaseHelper from '../../helpers/firebase';
const { database, createBatch, rsfFirestore, createNewRef } = FirebaseHelper;
const fsProps = {};
const reverseString = str =>
  str
    .split('')
    .reverse()
    .join('');

const sortChatrooms = (optionA, optionB) =>
  optionB.lastMessageTime - optionA.lastMessageTime;
const sortMessages = (optionA, optionB) =>
  optionA.messageTime - optionB.messageTime;
const getCurrentUser = () => {
  return {
    userId: 'wt4TiasxgPrQ3dNwVZ55',
    user: {
      id: 'wt4TiasxgPrQ3dNwVZ55',
      dob: '06-Apr-1993',
      gender: 'Male',
      language: 'Burmese',
      mobileNo: '5726784596',
      name: 'Zondra Kulic',
      profileImageUrl:
        'https://s3.amazonaws.com/redqteam.com/mateadmin/support-male-zonra.png',
    },
  };
};
const initialization = payload => {
  fsProps.userId = payload.userId;
  fsProps.usersCollections = database.collection('users');
  fsProps.chatroomCollections = database.collection('chatRooms');
  fsProps.chatroomsUserCollections = fsProps.chatroomCollections.where(
    'userId',
    '==',
    payload.userId
  );
  fsProps.messagesCollections = database.collection('messages');
};

const readUsers = async () =>
  await fsProps.usersCollections.get().then(querySnapshot => {
    const users = [];
    try {
      querySnapshot.forEach(doc => {
        if (doc.id !== fsProps.userId) {
          users.push({ id: doc.id, ...doc.data() });
        }
      });
    } catch (e) {}
    return users;
  });
const readChatrooms = async () =>
  await fsProps.chatroomsUserCollections.get().then(querySnapshot => {
    const chatRooms = [];
    try {
      querySnapshot.forEach(doc => {
        chatRooms.push(doc.data());
      });
    } catch (e) {}
    return chatRooms.sort(sortChatrooms);
  });
const readMessages = async ({ id }) =>
  await fsProps.messagesCollections
    .where('chatRoomId', '==', id)
    .get()
    .then(querySnapshot => {
      const messages = [];
      try {
        querySnapshot.forEach(doc => {
          messages.push(doc.data());
        });
      } catch (e) {}
      return messages.sort(sortMessages);
    });
const sendMessageBatch = async payload => {
  const batch = createBatch();
  const { chatRoom, text } = payload;
  const id = chatRoom.id;
  const revId = reverseString(id);
  const messageTime = new Date().getTime();
  const chatRoomModified = {
    lastMessage: text,
    lastMessageTime: messageTime,
  };
  batch.update(fsProps.chatroomCollections.doc(id), chatRoomModified);
  batch.update(fsProps.chatroomCollections.doc(revId), chatRoomModified);
  batch.set(fsProps.messagesCollections.doc(createNewRef()), {
    sender: chatRoom.userId,
    text,
    messageTime,
    chatRoomId: chatRoom.id,
  });
  batch.commit();
};

function* initChat() {
  const payload = getCurrentUser();
  initialization(payload);
  const users = yield call(readUsers);
  const chatRooms = users.length === 0 ? [] : yield call(readChatrooms);
  const messages =
    chatRooms.length === 0 ? [] : yield call(readMessages, chatRooms[0]);
  fsProps.selectedChatRoom = chatRooms.length > 0 && chatRooms[0];
  yield fork(updateChatrooms);
  yield put({
    type: actions.CHAT_INIT_SAGA,
    user: payload.user,
    userId: payload.userId,
    users,
    chatRooms,
    messages,
  });
}

function* sendMessage({ payload }) {
  fsProps.selectedChatRoom = payload.chatRoom;
  yield call(sendMessageBatch, payload);
  yield put({
    type: actions.NEW_MESSAGE_SUCCESFULL,
  });
}
function* addNewUser({ user, addNewUsersProp }) {
  const UserKey = createNewRef();
  const chatRoomKey = createNewRef();
  const chatRoomKeyRev = reverseString(chatRoomKey);

  const newUser = { id: UserKey, ...addNewUsersProp };
  const newChatroom = {
    id: chatRoomKey,
    reverse: false,
    userId: user.id,
    otherUserId: UserKey,
    otherUserInfo: { id: UserKey, ...addNewUsersProp },
    lastMessage: '',
    lastMessageTime: 0,
  };
  const newChatroomRev = {
    id: chatRoomKeyRev,
    reverse: true,
    userId: UserKey,
    otherUserId: user.id,
    otherUserInfo: user,
    lastMessage: '',
    lastMessageTime: 0,
  };

  const docUser = fsProps.usersCollections.doc(UserKey);
  docUser.set(newUser);
  const docCollection = fsProps.chatroomCollections.doc(chatRoomKey);
  docCollection.set(newChatroom);
  const docCollectionRev = fsProps.chatroomCollections.doc(chatRoomKeyRev);
  docCollectionRev.set(newChatroomRev);
  yield put({
    type: actions.ADD_NEW_USER_SAGA,
    newUser,
    newChatroom,
  });
}
function* updateChatrooms() {
  const successActionCreator = data => {
    const { type, newIndex } = data.docChanges()[0];
    const dataMoodified = type === 'modified';
    if (!dataMoodified) {
      return { type: 'NO_CHANGE' };
    }
    const chatRoom = data.docs[newIndex].data();

    return {
      type: actions.CHAT_UPDATE_CHATROOM_SAGA,
      payload: { chatRoom },
    };
  };
  yield call(rsfFirestore.syncCollection, fsProps.chatroomsUserCollections, {
    successActionCreator,
  });
}
function* updateChatroomSaga({ payload }) {
  const { chatRoom } = payload;
  let { selected } = payload;
  let messages;
  if (selected || chatRoom.id === fsProps.selectedChatRoom.id) {
    fsProps.selectedChatRoom = chatRoom;
    messages = yield call(readMessages, chatRoom);
    selected = true;
  }
  yield put({
    type: actions.CHAT_UPDATE_CHATROOM,
    chatRoom,
    messages,
    selected,
  });
}
export default function* rootSaga() {
  yield all([
    takeEvery(actions.CHAT_INIT, initChat),
    takeEvery(actions.CHAT_UPDATE_CHATROOM_SAGA, updateChatroomSaga),
    takeEvery(actions.CHAT_SEND_MESSAGE, sendMessage),
    takeEvery(actions.ADD_NEW_USER, addNewUser),
  ]);
}
