import { all, fork } from 'redux-saga/effects';
import { downloadLogSaga } from './downloadlog.saga';
import { authenticationSaga } from './authentication.saga';
import { filemanagerSaga } from './filemanager.saga';
import { manageLinksSaga } from './managelinks.saga';
import { statsSaga } from './stats.saga';
import { DownloadSaga } from './download.saga';

function* root() {
  yield all([
    fork(authenticationSaga),
    fork(filemanagerSaga),
    fork(manageLinksSaga),
    fork(downloadLogSaga),
    fork(statsSaga),
    fork(DownloadSaga),
  ]);
}

export default root;

export interface ErrorResponse {
  response: 'error';
  errors: { errMsg: string };
}
