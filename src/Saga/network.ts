import { downloadLogQueryListAction } from '../Containers/DownloadLog/downloadlog.store';
import { createDownloadLinkAction, getCommandAction, queryFileStatusAction } from '../Store/filemanager.store';
import { enableDisableLinkAction, manageListQueryListAction } from '../Store/managelinks.store';
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

const manageLinksQueryRequest = (payload: ReturnType<typeof manageListQueryListAction>['payload']) => {
  const data = { limit: payload.items };
  return post({ payload: { endPoint: 'managelinks', data } });
};

const updateQueryRequest = (payload: ReturnType<typeof enableDisableLinkAction>['payload']) => {
  const data = { update: payload.action, id: payload.id };
  return post({ payload: { endPoint: 'managelinks', data } });
};

const queryDownloadLogRequest = ({ limit }: ReturnType<typeof downloadLogQueryListAction>['payload']) => {
  const data = { limit };
  return post({ payload: { endPoint: 'downloadLogs', data } });
};

export {
  loginRequest,
  executeCommandRequest,
  queryDownloadStatusRequest,
  createDownloadLinkRequest,
  manageLinksQueryRequest,
  updateQueryRequest,
  queryDownloadLogRequest,
};
