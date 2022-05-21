import {
  EntityModelUserGroupEntity,
  EntityModelVideoEntity,
  PageMetadata,
  UserGroupEntityEntityControllerApi,
  VideoEntityEntityControllerApi,
} from 'api_generated';

import { getThumbnail } from 'utils/videos';

import { fileAxios, otherAxios } from './axios';
import { getId, MyVideoResponse } from './userProfile';

// const service = new VideoEntitySearchControllerApi();
const videoService = new VideoEntityEntityControllerApi();
const groupService = new UserGroupEntityEntityControllerApi();

export type VideoDto = EntityModelVideoEntity & { thumbnail: string & EntityModelVideoEntity['_links'] };

export const getAllVideos = (pageInfo?: PageMetadata) => {
  return videoService
    .getCollectionResourceVideoentityGet1(pageInfo?.number, pageInfo?.size, ['id'])
    .then((res) => {
      return {
        videos: res.data._embedded?.videoEntities,
        pageInfo: res.data.page,
      };
    })
    .then((res) => ({
      ...res,
      videos: res.videos?.map(
        (v) => ({ ...v, thumbnail: getThumbnail(v), id: getId(v as MyVideoResponse) || v.id } as VideoDto),
      ),
    }))
    .catch((err) => {
      throw err;
    });
};

type MyGroup = EntityModelUserGroupEntity & {
  _embedded?: {
    videos?: EntityModelVideoEntity[];
  };
};

export const getAllVideosByGroupId = (id: number) => {
  return groupService
    .getItemResourceUsergroupentityGet(String(id))
    .then((res) => ({ videos: (res.data as MyGroup)?._embedded?.videos || [] }))
    .then(
      (res) =>
        res.videos
          .map((v) => ({ ...v, thumbnail: getThumbnail(v) } as VideoDto))
          .sort((a, b) => (a?.id || 1) - (b?.id || 0)) || [],
    );
};

const addAuthor = (authorUrl: string, videoId: number) => {
  return otherAxios.put(`/videos/${videoId}/author`, authorUrl);
};

const addGroups = (groups: string[], videoId: number) => {
  return otherAxios.put(`/videos/${videoId}/allowedGroups`, groups.join('\n'));
};

const uploadFile = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return fileAxios.post('/storage/videolectures2', formData);
};

type UploadVideoOptions = { name: string; description: string; source: string; file?: File };

export const uploadVideo = async (options: UploadVideoOptions, authorUrl: string, groups: string[]) => {
  let source = options.source;
  if (options.file) {
    const res = await uploadFile(options.file).catch((err) => {
      throw err;
    });
    source = await res.data;
    delete options.file;
  }

  const video = await videoService.postCollectionResourceVideoentityPost({ ...options, source }).catch((err) => {
    throw err;
  });
  const id = video.data.id as number;
  await addAuthor(authorUrl, id).catch((err) => {
    throw err;
  });
  await addGroups(groups, id).catch((err) => {
    throw err;
  });
};

export const editVideo = async (options: UploadVideoOptions, id: number, groups: string[]) => {
  await videoService.patchItemResourceVideoentityPatch(String(id), { ...options });
  await addGroups(groups, id).catch((err) => {
    throw err;
  });
};

export const deleteVideo = async (id: number) => {
  await videoService.deleteItemResourceVideoentityDelete(String(id)).catch((err) => {
    throw err;
  });
};
