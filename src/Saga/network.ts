import { loginAction } from '../Store/user.store';

const { protocol, hostname } = window.location;
const URL = `${protocol}//${hostname}/index.php`;

interface Post {
  payload: Object;
}

const post = ({ payload }: Post) => {
  const body = JSON.stringify(payload);
  return fetch(URL, { method: 'POST', body, credentials: 'include', headers: { 'Content-Type': 'application/json' } });
};

const loginRequest = (payload: ReturnType<typeof loginAction>['payload']) => {
  const { username, password } = payload;
  const data = { uname: username, pword: password };
  return post({ payload: { endPoint: 'login', data } }).then((_) => _.json());
};

export { loginRequest };
