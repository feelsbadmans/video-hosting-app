import { EntityModelVideoEntity, PageMetadata } from 'api_generated';
import { FetchStatus } from 'types/fetchStatus';

export type VideosState = {
  data?: EntityModelVideoEntity[];
  pageInfo?: PageMetadata;
  fetchStatus: FetchStatus;
  errorMsg?: string;
};
