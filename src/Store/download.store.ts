import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = { filename: '', fileid: '', filesize: '', error: '', loading: false };

type Download = typeof initialState;

const download = createSlice({
  name: 'download',
  initialState,
  reducers: {
    receiveFileIdAction(state, { payload }: PayloadAction<{ fileid: Download['fileid'] }>) {
      state.fileid = payload.fileid;
    },
    queryFileInfoAction(
      _,
      __: PayloadAction<{
        fileid: Download['fileid'];
      }>
    ) {},
    queryDownloadFileAction(_, __: PayloadAction<{ fileid: Download['fileid'] }>) {},
    receiveFileInfoAction(state, { payload }: PayloadAction<Omit<Download, 'fileid' | 'error' | 'loading'>>) {
      state.filename = payload.filename;
      state.filesize = payload.filesize;
    },
    receiveFileErrorAction(state, { payload }: PayloadAction<{ error: string }>) {
      state.error = payload.error;
    },
    receiveDownloadLoadingAction(state, { payload }: PayloadAction<Download['loading']>) {
      state.loading = payload;
    },
  },
});

export const {
  reducer: downloadReducer,
  actions: {
    receiveFileIdAction,
    receiveFileInfoAction,
    queryFileInfoAction,
    receiveFileErrorAction,
    queryDownloadFileAction,
    receiveDownloadLoadingAction,
  },
} = download;
