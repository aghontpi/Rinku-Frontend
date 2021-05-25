import { createSlice } from '@reduxjs/toolkit';

const initialState: { active: boolean; time: Date } = {
  active: true,
  time: new Date(),
};

export type Loader = typeof initialState;

const loader = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoaderAction(state) {
      state.active = true;
      state.time = new Date();
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
