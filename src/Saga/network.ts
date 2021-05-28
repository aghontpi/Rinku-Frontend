import { downloadLogQueryListAction } from '../Containers/DownloadLog/downloadlog.store';
import { createDownloadLinkAction, getCommandAction, queryFileStatusAction } from '../Store/filemanager.store';
import { enableDisableLinkAction, manageListQueryListAction } from '../Store/managelinks.store';
import { loginAction } from '../Store/user.store';

const URL = process.env.REACT_APP_BACKEND_URL;

if (!URL) {
  throw new Error('Please define variables in .env');
}

interface Post {
  payload: {
    endPoint: string;
    data: Object;
  };
  raw?: boolean;
}

const post = ({ payload, raw }: Post) => {
  const body = JSON.stringify(payload);
  return fetch(URL, {
    method: 'POST',
    body,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((_) => {
      // check if raw response is specified
      return raw ? _ : _.json();
    })
    .catch((error) => {
      //todo: custom error class
      throw new Error(error);
    });
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

const queryStatsRequest = () => {
  const data = { date: 'dummy' };
  return post({ payload: { endPoint: 'stats', data } });
};

const testAuthentication = () => post({ payload: { endPoint: 'stats', data: { date: 'dummy' } }, raw: true });

export {
  loginRequest,
  executeCommandRequest,
  queryDownloadStatusRequest,
  createDownloadLinkRequest,
  manageLinksQueryRequest,
  updateQueryRequest,
  queryDownloadLogRequest,
  queryStatsRequest,
  testAuthentication,
};
