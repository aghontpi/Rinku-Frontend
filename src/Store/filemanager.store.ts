import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Operation = 'list';

const initialState: {
  config: { dir: string; operation: Operation };
  files: FileProperties[];
  fileinfo: { file?: string; downloadName?: string };
} = {
  config: {
    dir: '*',
    operation: 'list',
  },
  files: [],
  fileinfo: { file: '' },
};

type FileManager = typeof initialState;

interface FileProperties {
  key: string;
  size: number;
  modified: number;
}

interface FilePayload {
  filepath: FileProperties['key'];
}

const filemanager = createSlice({
  name: 'filemanager',
  initialState,
  reducers: {
    getCommandAction(_, payload: PayloadAction<FileManager['config']>) {},
    receiveListAction(state, { payload }: PayloadAction<FileManager['files']>) {
      state.files = payload;
    },
    queryFileStatusAction(_, payload: PayloadAction<FilePayload>) {},
    receiveFileStatusAction(state, { payload }: PayloadAction<FileManager['fileinfo']>) {
      state.fileinfo = payload;
    },
    createDownloadLinkAction(_, payload: PayloadAction<FilePayload>) {},
  },
});

export const {
  reducer: fileManagerReducer,
  actions: {
    receiveListAction,
    getCommandAction,
    queryFileStatusAction,
    receiveFileStatusAction,
    createDownloadLinkAction,
  },
} = filemanager;
