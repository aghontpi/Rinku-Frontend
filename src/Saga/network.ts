import { createDownloadLinkAction, getCommandAction, queryFileStatusAction } from '../Store/filemanager.store';
import { loginAction } from '../Store/user.store';

const { protocol, hostname } = window.location;
const URL = `${protocol}//${hostname}/index.php`;

interface Post {
  payload: {
    endPoint: string;
    data: Object;
  };
}

const post = ({ payload }: Post) => {
  const body = JSON.stringify(payload);
  return fetch(URL, {
    method: 'POST',
    body,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  }).then((_) => _.json());
};

const loginRequest = (payload: ReturnType<typeof loginAction>['payload']) => {
  const { username, password } = payload;
  const data = { uname: username, pword: password };
  return post({ payload: { endPoint: 'login', data } });
};

const executeCommandRequest = (payload: ReturnType<typeof getCommandAction>['payload']) => {
  const data = payload;
  return post({ payload: { endPoint: 'fileOperation', data } });
};

const queryDownloadStatusRequest = (payload: ReturnType<typeof queryFileStatusAction>['payload']) => {
  const data = payload;
  return post({ payload: { endPoint: 'download', data } });
};

const createDownloadLinkRequest = (payload: ReturnType<typeof createDownloadLinkAction>['payload']) => {
  const data = { file: payload.filepath };
  return post({ payload: { endPoint: 'createDL', data } });
};

export { loginRequest, executeCommandRequest, queryDownloadStatusRequest, createDownloadLinkRequest };
