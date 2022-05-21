import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { getAllUsersAction } from 'redux/actions/users';
import { UsersState } from 'redux/types/users';

const initialState: UsersState = {
  data: undefined,
  fetchStatus: 'initial',
  errorMsg: undefined,
};

const usersSlice = createSlice<UsersState, SliceCaseReducers<UsersState>>({
  name: 'USERS',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsersAction.pending, (state) => ({
      ...state,
      fetchStatus: 'fetching',
      errorMsg: undefined,
    }));

    builder.addCase(getAllUsersAction.fulfilled, (state, { payload }) => ({
      ...state,
      fetchStatus: 'fetched',
      data: payload.users,
      pageInfo: payload.pageInfo,
    }));

    builder.addCase(getAllUsersAction.rejected, (state, { error }) => ({
      ...state,
      fetchStatus: 'error',
      errorMsg: error.message,
    }));
  },
});

export const usersReducer = usersSlice.reducer;
