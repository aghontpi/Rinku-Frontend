import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  user: string;
  nick: string;
  loginTime: string;
} = { loginTime: '', nick: '', user: '' };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {},
    login() {},
  },
});

export const {
  reducer: userReducer,
  actions: { login, logout },
} = userSlice;
