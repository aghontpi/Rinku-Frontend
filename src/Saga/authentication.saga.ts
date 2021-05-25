import { all, call, put, takeEvery } from 'redux-saga/effects';
import { hideLoaderAction, showLoaderAction } from '../Store/loader.store';
import { loginAction, receiveUserAction } from '../Store/user.store';
import { history, hydrateSession } from '../Utils';
import { loginRequest } from './network';
import { ErrorResponse } from './root.saga';

interface Content {
  user: string;
  nick: string;
  loginTime: string;
}

interface SuccessResponse {
  response: 'success';
  content: Content;
}

type NetworkResponse = ErrorResponse | SuccessResponse;

function* login({ payload }: ReturnType<typeof loginAction>) {
  yield put(showLoaderAction());
  const response: NetworkResponse = yield call(loginRequest, payload);
  if (response.response === 'error') {
    console.error('error, ');
  } else if (response.response === 'success') {
    yield call(hydrateSession, response.content);
    yield put(receiveUserAction(response.content));
    yield call(history.push, '/home');
  }
  yield put(hideLoaderAction());
}

function* authenticationSaga() {
  try {
    yield all([takeEvery(loginAction, login)]);
  } catch (error) {
    //todo common error handling
    console.error('error', error);
  }
}

export { authenticationSaga };
