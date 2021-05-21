import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { userReducer } from './user.store';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../Saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
