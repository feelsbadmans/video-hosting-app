import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { getUserProfileAction } from 'redux/actions/userProfile';
import { UserProfileState } from 'redux/types/userProfile';

const initialState: UserProfileState = {
  data: undefined,
  fetchStatus: 'initial',
  errorMsg: undefined,
};

const userProfileSlice = createSlice<UserProfileState, SliceCaseReducers<UserProfileState>>({
  name: 'USER_PROFILE',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserProfileAction.pending, (state) => ({
      ...state,
      fetchStatus: 'fetching',
      errorMsg: undefined,
    }));

    builder.addCase(getUserProfileAction.fulfilled, (state, { payload }) => ({
      ...state,
      fetchStatus: 'fetched',
      data: payload,
    }));

    builder.addCase(getUserProfileAction.rejected, (state, { error }) => ({
      ...state,
      fetchStatus: 'error',
      errorMsg: error.message,
    }));
  },
});

export const userProfileReducer = userProfileSlice.reducer;
