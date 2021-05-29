import { all, call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import { hideLoaderAction, showLoaderAction } from '../Store/loader.store';
import { loginAction, logoutAction, receiveUserAction } from '../Store/user.store';
import { history, hydrateSession } from '../Utils';
import { dehydrateSession } from '../Utils/session';
import { loginRequest, logoutRequest } from './network';
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
}

function* logout() {
  yield put(showLoaderAction());
  const response: NetworkResponse = yield call(logoutRequest);
  if (response.response === 'success') {
    yield call(dehydrateSession);
    yield put(receiveUserAction({ nick: '', loginTime: '', user: '' }));
    yield call(history.push, '/login');
  }
}

function* authenticationSaga() {
  try {
    yield all([takeEvery(loginAction, login), takeLeading(logoutAction, logout)]);
  } catch (error) {
    //todo common error handling
    console.error('error', error);
  }
}

export { authenticationSaga };
