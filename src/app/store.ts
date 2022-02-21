import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';
import detailSlice from 'features/detail/detailSlice';
import searchSlice from 'features/search/searchSlice';
import discoverSlice from 'features/discover/discoverSlice';
import watchSlice from 'features/watchs/watchsSlice';
import authReducer from 'features/auth/authSlice';
import settingSlice from 'features/setting/settingSlice';
import browseSlice from 'features/browse/browseSlice';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    auth: authReducer,
    detail: detailSlice,
    search: searchSlice,
    discover: discoverSlice,
    watchs: watchSlice,
    setting: settingSlice,
    browse: browseSlice
});
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
