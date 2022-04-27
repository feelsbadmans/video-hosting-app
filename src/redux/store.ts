import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { errorReducer as error } from './reducers/error';
import { userProfileReducer as userProfile } from './reducers/userProfile';
import { videosReducer as videos } from './reducers/videos';

const reducer = combineReducers({
  error,
  userProfile,
  videos,
});

export const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
