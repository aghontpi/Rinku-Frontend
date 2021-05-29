import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { queryDownloadLogRequest } from './network';
import { ErrorResponse } from './root.saga';
import { downloadLogQueryListAction, receiveDownloadLogAction } from '../Store/downloadlog.store';

type NetworkResponse = ErrorResponse | SuccessResponse;

interface SuccessResponse {
  response: 'success';
  content: string;
}

function* queryList({ payload }: ReturnType<typeof downloadLogQueryListAction>) {
  const response: NetworkResponse = yield call(queryDownloadLogRequest, payload);
  if (response.response === 'success') {
    const content = response.content as unknown as { list: string; total: string };
    const logs = JSON.parse(content.list) as ReturnType<typeof receiveDownloadLogAction>['payload']['logs'];

    yield put(receiveDownloadLogAction({ logs, total: Number.parseInt(content.total) }));
  } else {
    console.error('error');
  }
}

function* downloadLogSaga() {
  yield all([takeLatest(downloadLogQueryListAction, queryList)]);
}

export { downloadLogSaga };
