import { VideoDto } from 'api/videos';
import { PageMetadata } from 'api_generated';
import { FetchStatus } from 'types/fetchStatus';

export type VideosState = {
  data?: VideoDto[];
  pageInfo?: PageMetadata;
  fetchStatus: FetchStatus;
  errorMsg?: string;
};
