import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { getAllVideosAction } from 'redux/actions/videos';
import { VideosState } from 'redux/types/videos';

const initialState: VideosState = {
  data: undefined,
  fetchStatus: 'initial',
  errorMsg: undefined,
};

const videosSlice = createSlice<VideosState, SliceCaseReducers<VideosState>>({
  name: 'VIDEOS',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllVideosAction.pending, (state) => ({
      ...state,
      fetchStatus: 'fetching',
      errorMsg: undefined,
    }));

    builder.addCase(getAllVideosAction.fulfilled, (state, { payload }) => ({
      ...state,
      fetchStatus: 'fetched',
      data: payload.videos,
      pageInfo: payload.pageInfo,
    }));

    builder.addCase(getAllVideosAction.rejected, (state, { error }) => ({
      ...state,
      fetchStatus: 'error',
      errorMsg: error.message,
    }));
  },
});

export const videosReducer = videosSlice.reducer;
