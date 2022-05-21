import { UserProfile } from 'api/userProfile';
import { PageMetadata } from 'api_generated';
import { FetchStatus } from 'types/fetchStatus';

export type UsersState = {
  data?: UserProfile[];
  pageInfo?: PageMetadata;
  fetchStatus: FetchStatus;
  errorMsg?: string;
};
