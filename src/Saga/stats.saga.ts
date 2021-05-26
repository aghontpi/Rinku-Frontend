import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { hideLoaderAction, showLoaderAction } from '../Store/loader.store';
import { receiveStatsQueryAction, statsListQueryAction } from '../Store/stats.store';
import { queryStatsRequest } from './network';
import { ErrorResponse } from './root.saga';

type NetworkResponse = ErrorResponse | SuccessResponse;

interface SuccessResponse {
  response: 'success';
  content: string;
}

function* stats() {
  yield put(showLoaderAction());
  const response: NetworkResponse = yield call(queryStatsRequest);
  if (response.response === 'success') {
    const content = response.content as unknown as { stats: string };
    const stats = JSON.parse(content.stats) as unknown as ReturnType<typeof receiveStatsQueryAction>['payload'];
    yield put(receiveStatsQueryAction(stats));
  } else {
    console.error(response);
  }
  yield put(hideLoaderAction());
}

function* statsSaga() {
  yield all([takeLatest(statsListQueryAction, stats)]);
}

export { statsSaga };
