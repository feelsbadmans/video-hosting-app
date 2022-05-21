import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers } from 'api/users';
import { PageMetadata } from 'api_generated';

export const getAllUsersAction = createAsyncThunk('USERS/GET_USERS', async (options: { pageInfo?: PageMetadata }) => {
  const { pageInfo } = options;

  return await getAllUsers(pageInfo);
});
