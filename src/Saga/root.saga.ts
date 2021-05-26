import { all, fork } from 'redux-saga/effects';
import { downloadLogSaga } from '../Containers/DownloadLog/downloadlog.saga';
import { authenticationSaga } from './authentication.saga';
import { filemanagerSaga } from './filemanager.saga';
import { manageLinksSaga } from './managelinks.saga';
import { statsSaga } from './stats.saga';

function* root() {
  yield all([
    fork(authenticationSaga),
    fork(filemanagerSaga),
    fork(manageLinksSaga),
    fork(downloadLogSaga),
    fork(statsSaga),
  ]);
}

export default root;

export interface ErrorResponse {
  response: 'error';
  errors: { errMsg: string };
}
