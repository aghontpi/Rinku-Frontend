import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { userReducer } from './user.store';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../Saga';
import { fileManagerReducer } from './filemanager.store';
import { ModalReducer } from './modal.store';
import { manageLinksReducer } from './managelinks.store';
import { downloadLogReducer } from '../Containers/DownloadLog/downloadlog.store';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    filemanager: fileManagerReducer,
    modal: ModalReducer,
    managelinks: manageLinksReducer,
    downloadlogs: downloadLogReducer,
  },
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
