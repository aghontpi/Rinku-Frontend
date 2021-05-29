import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  user: string;
  nick: string;
  loginTime: string;
  form?: { error: { user: string; password: string } };
} = { loginTime: '', nick: '', user: '' };

type UserDetails = typeof initialState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutAction(state) {},
    loginAction(_, payload: PayloadAction<{ username: string; password: string }>) {},
    receiveUserAction(state, { payload }: PayloadAction<UserDetails>) {
      state.loginTime = payload.loginTime;
      state.nick = payload.nick;
      state.user = payload.user;
    },
    receiveFormErrorAction(state, { payload }: PayloadAction<UserDetails['form']>) {
      state.form = payload;
    },
  },
});

export const {
  reducer: userReducer,
  actions: { loginAction, logoutAction, receiveUserAction, receiveFormErrorAction },
} = userSlice;

export type { UserDetails };
