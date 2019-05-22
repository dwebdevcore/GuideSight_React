import { all } from 'redux-saga/effects';
import githubSearchSagas from './githubSearch/sagas';

export default function* devSaga() {
  yield all([githubSearchSagas()]);
}
