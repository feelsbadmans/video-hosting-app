import { PageMetadata, UserGroupEntity, VideoEntityEntityControllerApi } from 'api_generated';

// const service = new VideoEntitySearchControllerApi();
const videoService = new VideoEntityEntityControllerApi();

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
    .catch((err) => {
      throw err;
    });
};
