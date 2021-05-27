import { createSlice } from '@reduxjs/toolkit';

const initialState: { active: boolean } = {
  active: true,
};

export type Loader = typeof initialState;

const loader = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoaderAction(state) {
      state.active = true;
    },
    hideLoaderAction(state) {
      state.active = false;
    },
  },
});

export const {
  actions: { showLoaderAction, hideLoaderAction },
  reducer: loaderReducer,
} = loader;
