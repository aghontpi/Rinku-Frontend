import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import {
  getCommandAction,
  queryFileStatusAction,
  receiveListAction,
  receiveFileStatusAction,
  createDownloadLinkAction,
} from '../Store/filemanager.store';
import { createDownloadLinkRequest, executeCommandRequest, queryDownloadStatusRequest } from './network';
import { ErrorResponse } from './root.saga';

interface SuccessResponse {
  response: 'success';
  content: string;
}

type NetworkResponse = ErrorResponse | SuccessResponse;

function* executeCommand({ payload }: ReturnType<typeof getCommandAction>) {
  const response: NetworkResponse = yield call(executeCommandRequest, payload);
  if (response.response === 'error') {
    console.error('error');
  } else if (response.response === 'success') {
    const files: ReturnType<typeof receiveListAction>['payload'] = JSON.parse(response.content);
    yield put(receiveListAction(files));
  }
}

function* queryStatus({ payload }: ReturnType<typeof queryFileStatusAction>) {
  const response: NetworkResponse = yield call(queryDownloadStatusRequest, payload);
  if (response.response === 'success') {
    const status: { file: string } = JSON.parse(JSON.stringify(response.content));
    yield put(receiveFileStatusAction(status));
  }
}

function* createDownloadLink({ payload }: ReturnType<typeof createDownloadLinkAction>) {
  const response: NetworkResponse = yield call(createDownloadLinkRequest, payload);
  if (response.response === 'success') {
    const link: { downloadId: string; msg: string } = JSON.parse(JSON.stringify(response.content));
    yield put(receiveFileStatusAction({ downloadName: link.downloadId }));
  }
}

function* filemanagerSaga() {
  try {
    yield all([
      takeLatest(getCommandAction, executeCommand),
      takeLatest(queryFileStatusAction, queryStatus),
      takeLatest(createDownloadLinkAction, createDownloadLink),
    ]);
  } catch (error) {
    //todo error class which diverges for each error
    console.error('error', error);
  }
}

export { filemanagerSaga };
