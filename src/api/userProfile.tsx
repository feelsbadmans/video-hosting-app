import {
  AuthApiApi,
  AuthorityEntityNameEnum,
  CreateUserDto,
  EntityModelAuthorityEntity,
  EntityModelUserEntity,
  EntityModelVideoEntity,
  LoginUserDto,
  UserEntityPropertyReferenceControllerApi,
  UserEntitySearchControllerApi,
  VideoEntityResponse,
} from 'api_generated';

import { getThumbnail } from 'utils/videos';

import { VideoDto } from './videos';

const loginService = new AuthApiApi();
const userService = new UserEntitySearchControllerApi();
const userPropertyService = new UserEntityPropertyReferenceControllerApi();

export const login = async (options: LoginUserDto) => {
  await loginService
    .login(options)
    .then((res) => {
      const token = res.headers['authorization'];

      localStorage.setItem('token', token);
      localStorage.setItem('username', res.data.user?.username || '');
    })
    .catch((err) => {
      throw err;
    });
};

export const register = async (options: CreateUserDto) => {
  await loginService
    .register(options)
    .then(async () => {
      await login({ username: options.username, password: options.password }).catch((err) => {
        throw err;
      });
    })
    .catch((err) => {
      throw err;
    });
};

export type UserProfile = Omit<EntityModelUserEntity, 'authorities' | 'videos'> & {
  authorities?: EntityModelAuthorityEntity[];
  videos: VideoDto[];
};

export type MyVideoResponse = VideoEntityResponse & {
  _links?: EntityModelVideoEntity['_links'];
};

export const getId = (v: MyVideoResponse) => Number((v?._links?.self.href as string).split('/').pop());

export const getUserByUserName = (username: string): Promise<UserProfile> => {
  return userService
    .executeSearchUserentityGet2(username)
    .then((value) => {
      const { username, id, accountNonExpired, accountNonLocked, enabled, _links, name } = value.data;

      return { username, id, accountNonExpired, accountNonLocked, enabled, _links, name } as UserProfile;
    })
    .then(async (user) => {
      const id = String(user.id || 1);

      await userPropertyService.followPropertyReferenceUserentityGet1(id).then((v) => {
        user.authorities = v.data._embedded?.authorityEntities;
      });

      if (user.authorities?.some((v) => v.name === AuthorityEntityNameEnum.OrdinaryUser)) {
        await userPropertyService.followPropertyReferenceUserentityGet21(id).then((v) => {
          user.group = v.data;
        });
      }

      if (user.authorities?.some((v) => v.name === AuthorityEntityNameEnum.VideoCreator)) {
        await userPropertyService.followPropertyReferenceUserentityGet31(id).then((v) => {
          user.videos =
            v.data._embedded?.videoEntities
              ?.map(
                (v) =>
                  ({
                    ...v,
                    id: getId(v as MyVideoResponse) || v.id,
                    thumbnail: getThumbnail(v),
                  } as VideoDto),
              )
              .sort((a, b) => (a?.id || 1) - (b?.id || 0)) || [];
        });
      }

      return user;
    })
    .catch((err) => {
      throw err;
    });
};
