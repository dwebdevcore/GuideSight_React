import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';
import 'firebase/firestore';
import { firebaseConfig } from '../../settings';

const valid =
  firebaseConfig && firebaseConfig.apiKey && firebaseConfig.projectId;

const firebaseApp = valid && firebase.initializeApp(firebaseConfig);
const firebaseAuth = valid && firebase.auth;

class FirebaseHelper {
  isValid = valid;
  EMAIL = 'email';
  FACEBOOK = 'facebook';
  GOOGLE = 'google';
  GITHUB = 'github';
  TWITTER = 'twitter';

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.database = this.isValid && firebase.firestore();
    if (this.database) {
      const settings = { timestampsInSnapshots: true };
      this.database.settings(settings);
    }
    this.rsf =
      this.isValid && new ReduxSagaFirebase(firebaseApp, firebase.firestore());
    this.rsfFirestore = this.isValid && this.rsf.firestore;
  }

  createBatch = () => {
    return this.database.batch();
  };

  login(provider, info) {
    if (!this.isValid) {
      return;
    }
    switch (provider) {
      case this.EMAIL:
        return firebaseAuth().signInWithEmailAndPassword(
          info.email,
          info.password
        );
      case this.FACEBOOK:
        return firebaseAuth().FacebookAuthProvider();
      case this.GOOGLE:
        return firebaseAuth().GoogleAuthProvider();
      case this.GITHUB:
        return firebaseAuth().GithubAuthProvider();
      case this.TWITTER:
        return firebaseAuth().TwitterAuthProvider();
      default:
    }
  }

  logout() {
    return firebaseAuth().signOut();
  }

  isAuthenticated() {
    firebaseAuth().onAuthStateChanged(user => {
      return user ? true : false;
    });
  }
  resetPassword(email) {
    return firebaseAuth().sendPasswordResetEmail(email);
  }
  createNewRef() {
    return firebase
      .database()
      .ref()
      .push().key;
  }
  processFireStoreCollection(snapshot) {
    let data = {};
    snapshot.forEach(doc => {
      data = {
        ...data,
        [doc.id]: doc.data(),
      };
    });
    return data;
  }
}

export default new FirebaseHelper();
