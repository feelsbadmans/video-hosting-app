import { EntityModelVideoEntity, PageMetadata, UserGroupEntity, VideoEntityEntityControllerApi } from 'api_generated';

import { getThumbnail } from 'utils/videos';

// const service = new VideoEntitySearchControllerApi();
const videoService = new VideoEntityEntityControllerApi();

export type VideoDto = EntityModelVideoEntity & { thumbnail: string };

export const getAllVideos = (groupName: string, pageInfo?: PageMetadata) => {
  const token = localStorage.getItem('token');

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return videoService
    .getCollectionResourceVideoentityGet1(pageInfo?.number, pageInfo?.size, undefined, options)
    .then((res) => ({
      videos: res.data._embedded?.videoEntities?.filter(
        (v) => Array.from(v?.allowedGroups || ([] as UserGroupEntity[])).some((g) => g.name === groupName) || [],
      ),
      pageInfo: res.data.page,
    }))
    .then((res) => ({
      ...res,
      videos: res.videos?.map((v) => ({ ...v, thumbnail: getThumbnail(v) } as VideoDto)),
    }))
    .catch((err) => {
      throw err;
    });
};
