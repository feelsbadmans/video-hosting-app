import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { clearErrorAction, setErrorAction } from 'redux/actions/error';
import { ErrorState } from 'redux/types/error';

const initialState: ErrorState = {
  message: '',
  needToShow: false,
};

const errorSlice = createSlice<ErrorState, SliceCaseReducers<ErrorState>>({
  name: 'ERROR',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setErrorAction, (state, { payload }) => payload);
    builder.addCase(clearErrorAction, (state, { payload }) => payload);
    //all errors
  },
});

export const errorReducer = errorSlice.reducer;
