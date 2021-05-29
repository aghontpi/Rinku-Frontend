import { all, call, put, takeLeading } from '@redux-saga/core/effects';
import {
  queryDownloadFileAction,
  queryFileInfoAction,
  receiveDownloadLoadingAction,
  receiveFileErrorAction,
  receiveFileInfoAction,
} from '../Store/download.store';
import { queryDownloadRequest, queryFileInfoRequest } from './network';
import { ErrorResponse } from './root.saga';
type NetworkResponse = ErrorResponse | SuccessResponse;

interface SuccessResponse {
  response: 'success';
  content: string;
}

function* queryFileInfo({ payload }: ReturnType<typeof queryFileInfoAction>) {
  const response: NetworkResponse = yield call(queryFileInfoRequest, payload);
  if (response.response === 'success') {
    console.log(response);
    const content = response.content as unknown as {
      file: { captcha: 'enable' | 'disable'; filename: string; filesize: string };
    };
    yield put(receiveFileInfoAction({ filename: content.file.filename, filesize: content.file.filesize }));
  } else if (response.response === 'error') {
    yield put(receiveFileErrorAction({ error: response.errors.errMsg }));
  }
}

function* queryDownload({ payload }: ReturnType<typeof queryDownloadFileAction>) {
  yield put(receiveDownloadLoadingAction(true));
  const response: NetworkResponse = yield call(queryDownloadRequest, payload);
  if (response.response === 'success') {
    yield call(() => new Promise((resolve, _) => setTimeout(resolve, 1000)));
    yield put(receiveDownloadLoadingAction(false));
    const content = response.content as unknown as {
      file: {
        filename: string;
        filesize: string;
        captcha: string;
        downloadUrl: string;
      };
    };
    if (content.file.downloadUrl) {
      yield call(() => {
        window.location.href = content.file.downloadUrl;
      });
    }
    console.error('error', 'contact admin');
  } else if (response.response === 'error') {
    yield put(receiveFileErrorAction({ error: response.errors.errMsg }));
  }
}

function* DownloadSaga() {
  yield all([takeLeading(queryFileInfoAction, queryFileInfo), takeLeading(queryDownloadFileAction, queryDownload)]);
}

export { DownloadSaga };
