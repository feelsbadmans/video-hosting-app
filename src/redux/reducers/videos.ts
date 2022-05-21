import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { getAllVideosAction, getAllVideosByGroupIdAction } from 'redux/actions/videos';
import { VideosState } from 'redux/types/videos';

const initialState: VideosState = {
  data: undefined,
  allData: undefined,
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
      allData: payload.videos,
      pageInfo: payload.pageInfo,
    }));

    builder.addCase(getAllVideosAction.rejected, (state, { error }) => ({
      ...state,
      fetchStatus: 'error',
      errorMsg: error.message,
    }));

    builder.addCase(getAllVideosByGroupIdAction.pending, (state) => ({
      ...state,
      fetchStatus: 'fetching',
      errorMsg: undefined,
    }));

    builder.addCase(getAllVideosByGroupIdAction.fulfilled, (state, { payload }) => ({
      ...state,
      fetchStatus: 'fetched',
      data: payload,
    }));

    builder.addCase(getAllVideosByGroupIdAction.rejected, (state, { error }) => ({
      ...state,
      fetchStatus: 'error',
      errorMsg: error.message,
    }));
  },
});

export const videosReducer = videosSlice.reducer;
