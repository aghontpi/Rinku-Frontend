import { createSlice } from '@reduxjs/toolkit';
import { ModalProps } from 'semantic-ui-react';

const initialState: {
  open: ModalProps['open'];
  size: ModalProps['size'];
} = {
  open: false,
  size: 'small',
};

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open(state) {
      state.open = false;
      state.size = 'small';
    },
    close(state) {
      state.open = false;
    },
  },
});

export const {
  actions: { open: ModalOpen, close: ModalClose },
  reducer: ModalReducer,
} = modal;
