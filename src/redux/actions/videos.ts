import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllVideos } from 'api/videos';
import { PageMetadata } from 'api_generated';

export const getAllVideosAction = createAsyncThunk(
  'VIDEOS/GET_VIDEOS',
  async (options: { groupname: string; pageInfo?: PageMetadata }) => {
    const { groupname, pageInfo } = options;

    return await getAllVideos(groupname, pageInfo);
  },
);
