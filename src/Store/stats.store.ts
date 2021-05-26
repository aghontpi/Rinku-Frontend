import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { stats: StatsItem[] } = { stats: [] };

interface StatsItem {
  fname: string;
  downloads: string;
}

type Stats = typeof initialState;

const stats = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    statsListQueryAction(_, __) {},
    receiveStatsQueryAction(state, { payload }: PayloadAction<Stats['stats']>) {
      state.stats = payload;
    },
  },
});

export const {
  actions: { statsListQueryAction, receiveStatsQueryAction },
  reducer: statsReducer,
} = stats;
