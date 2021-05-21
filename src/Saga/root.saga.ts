import { all, fork } from 'redux-saga/effects';
import { authenticationSaga } from './authentication.saga';
import { filemanagerSaga } from './filemanager.saga';

function* root() {
  yield all([fork(authenticationSaga), fork(filemanagerSaga)]);
}

export default root;

export interface ErrorResponse {
  response: 'error';
  errors: { errMsg: string };
}
