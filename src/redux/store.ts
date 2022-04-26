import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { errorReducer as error } from './reducers/error';

const reducer = combineReducers({
  error,
});

export const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
