import { all, fork } from 'redux-saga/effects';
import { authenticationSaga } from './authentication';

function* root() {
  yield all([fork(authenticationSaga)]);
}

export default root;
