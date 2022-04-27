import { UserProfile } from 'api/userProfile';
import { FetchStatus } from 'types/fetchStatus';

export type UserProfileState = {
  data?: UserProfile;
  fetchStatus: FetchStatus;
  errorMsg?: string;
};
