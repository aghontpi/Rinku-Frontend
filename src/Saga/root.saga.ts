import { all, fork } from 'redux-saga/effects';
import { downloadLogSaga } from '../Containers/DownloadLog/downloadlog.saga';
import { authenticationSaga } from './authentication.saga';
import { filemanagerSaga } from './filemanager.saga';
import { manageLinksSaga } from './managelinks.saga';

function* root() {
  yield all([fork(authenticationSaga), fork(filemanagerSaga), fork(manageLinksSaga), fork(downloadLogSaga)]);
}

export default root;

export interface ErrorResponse {
  response: 'error';
  errors: { errMsg: string };
}
