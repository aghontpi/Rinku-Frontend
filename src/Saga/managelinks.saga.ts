import { all, put, takeLatest } from '@redux-saga/core/effects';
import { call } from 'redux-saga/effects';
import { hideLoaderAction, showLoaderAction } from '../Store/loader.store';
import {
  enableDisableLinkAction,
  manageListQueryListAction,
  receiveListQueryAction,
  switchLinkAction,
} from '../Store/managelinks.store';
import { RootState } from '../Store/store';
import { manageLinksQueryRequest, updateQueryRequest } from './network';
import { ErrorResponse } from './root.saga';

type NetworkResponse = ErrorResponse | SuccessResponse;

interface SuccessResponse {
  response: 'success';
  content: string;
}

function* queryList({ payload }: ReturnType<typeof manageListQueryListAction>) {
  yield put(showLoaderAction());
  const response: NetworkResponse = yield call(manageLinksQueryRequest, payload);
  if (response.response === 'success') {
    const content = response.content as unknown as { list: string; limit: string };
    const items: RootState['managelinks']['content'] = JSON.parse(content.list);
    yield put(receiveListQueryAction({ content: items, limit: Number.parseInt(content.limit) }));
  } else {
    console.error('error', response);
  }
  yield put(hideLoaderAction());
}

function* updateQuery({ payload }: ReturnType<typeof enableDisableLinkAction>) {
  yield put(showLoaderAction());
  const response: NetworkResponse = yield call(updateQueryRequest, payload);
  if (response.response === 'success') {
    const content = response.content as unknown as { status: 'item updated' | string };
    if (content.status === 'item updated') {
      yield put(switchLinkAction({ id: payload.id, status: payload.action }));
    } else {
      console.trace('todo: handle negative case', content);
    }
  } else {
    console.error('error', response);
  }
  yield put(hideLoaderAction());
}

function* manageLinksSaga() {
  try {
    yield all([takeLatest(manageListQueryListAction, queryList), takeLatest(enableDisableLinkAction, updateQuery)]);
  } catch (e) {
    console.error(e);
  }
}

export { manageLinksSaga };
