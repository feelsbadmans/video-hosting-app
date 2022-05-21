import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllVideos, getAllVideosByGroupId } from 'api/videos';
import { PageMetadata } from 'api_generated';

export const getAllVideosAction = createAsyncThunk(
  'VIDEOS/GET_ALL_VIDEOS',
  async (options: { pageInfo?: PageMetadata }) => {
    const { pageInfo } = options;

    return await getAllVideos(pageInfo);
  },
);

export const getAllVideosByGroupIdAction = createAsyncThunk(
  'VIDEOS/GET_ALL_VIDEOS_BY_GROUP_ID',
  async (options: { id: number }) => {
    const { id } = options;

    return await getAllVideosByGroupId(id);
  },
);
