import { EntityModelVideoEntity, PageMetadata, UserGroupEntity, VideoEntityEntityControllerApi } from 'api_generated';

import { getThumbnail } from 'utils/videos';

import { otherAxios } from './axios';

// const service = new VideoEntitySearchControllerApi();
const videoService = new VideoEntityEntityControllerApi();

export type VideoDto = EntityModelVideoEntity & { thumbnail: string & EntityModelVideoEntity['_links'] };

export const getAllVideos = (groupName: string, pageInfo?: PageMetadata) => {
  return videoService
    .getCollectionResourceVideoentityGet1(pageInfo?.number, pageInfo?.size, ['id'])
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

const addAuthor = (authorUrl: string, videoId: number) => {
  return otherAxios.put(`/videos/${videoId}/author`, authorUrl);
};

type DownloadVideoOptions = { name: string; description: string; source: string; file?: File };

export const downloadVideo = async (options: DownloadVideoOptions, authorUrl: string) => {
  const source = options.source || '';
  const video = await videoService.postCollectionResourceVideoentityPost({ ...options, source });
  await addAuthor(authorUrl, video.data.id as number);
};

export const editVideo = async (options: DownloadVideoOptions, id: number) => {
  await videoService.patchItemResourceVideoentityPatch(String(id), { ...options });
};

export const deleteVideo = async (id: number) => {
  await videoService.deleteItemResourceVideoentityDelete(String(id));
};
