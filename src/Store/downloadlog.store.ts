import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { limit: number; logs: DownloadLogItem[]; total: number } = {
  limit: 10,
  logs: [],
  total: 0,
};

type DownloadLog = typeof initialState;

interface DownloadLogItem {
  download_log_id: string;
  id: string;
  ip: string;
  time: string;
  user: string;
  user_agent: string;
  path: string;
}

const downloadlog = createSlice({
  name: 'downloadlog',
  initialState,
  reducers: {
    downloadLogQueryListAction(_, payload: PayloadAction<{ limit: DownloadLog['limit'] }>) {},
    receiveDownloadLogAction(state, { payload }: PayloadAction<Omit<DownloadLog, 'limit'>>) {
      state.logs = payload.logs;
      state.total = payload.total;
    },
    downloadLogChangePageAction(state, { payload }: PayloadAction<{ page: number }>) {
      state.limit = payload.page;
    },
  },
});

export const {
  actions: { downloadLogQueryListAction, receiveDownloadLogAction, downloadLogChangePageAction },
  reducer: downloadLogReducer,
} = downloadlog;
