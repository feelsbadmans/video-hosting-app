import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserByUserName } from 'api/userProfile';

export const getUserProfileAction = createAsyncThunk('USER_PROFILE/GET_USER', async (username: string) => {
  return await getUserByUserName(username);
});
