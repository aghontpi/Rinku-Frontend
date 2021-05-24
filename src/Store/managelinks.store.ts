import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { items: number; content: DownloadLinksProperties[]; limit: number } = {
  items: 10,
  content: [],
  limit: 0,
};

type ManageLinks = typeof initialState;

export interface DownloadLinksProperties {
  download_name: string;
  path_of_file: string;
  status: 'Y' | 'N';
  id: number;
}

type Status = DownloadLinksProperties['status'];

const managelinks = createSlice({
  name: 'managelinks',
  initialState,
  reducers: {
    manageListQueryListAction(_, payload: PayloadAction<Omit<ManageLinks, 'content' | 'limit'>>) {},
    receiveListQueryAction(state, { payload }: PayloadAction<Omit<ManageLinks, 'items'>>) {
      state.content = payload.content;
      state.limit = payload.limit;
    },
    enableDisableLinkAction(_, payload: PayloadAction<{ action: Status; id: number }>) {},
    switchLinkAction(state, { payload }: PayloadAction<{ id: number; status: Status }>) {
      if (state.content.length > 0) {
        state.content = state.content.map((item) => {
          if (payload.id === item.id) {
            item.status = payload.status;
          }
          return item;
        });
        console.log(state);
      }
    },
    managelistChangePageAction(state, { payload }: PayloadAction<{ page: number }>) {
      state.items = payload.page;
    },
  },
});

export const {
  actions: {
    manageListQueryListAction,
    receiveListQueryAction,
    enableDisableLinkAction,
    switchLinkAction,
    managelistChangePageAction,
  },
  reducer: manageLinksReducer,
} = managelinks;
