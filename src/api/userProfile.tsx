import {
  AuthApiApi,
  AuthorityEntityNameEnum,
  CreateUserDto,
  EntityModelAuthorityEntity,
  EntityModelUserEntity,
  LoginUserDto,
  UserEntityPropertyReferenceControllerApi,
  UserEntitySearchControllerApi,
} from 'api_generated';

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

export type UserProfile = Omit<EntityModelUserEntity, 'authorities'> & { authorities?: EntityModelAuthorityEntity[] };

export const getUserByUserName = (username: string): Promise<UserProfile> => {
  const token = localStorage.getItem('token');

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return userService
    .executeSearchUserentityGet2(username, options)
    .then((value) => {
      const { username, id, accountNonExpired, accountNonLocked, enabled } = value.data;

      return { username, id, accountNonExpired, accountNonLocked, enabled } as UserProfile;
    })
    .then(async (user) => {
      const id = String(user.id || 1);

      await userPropertyService.followPropertyReferenceUserentityGet1(id, options).then((v) => {
        user.authorities = v.data._embedded?.authorityEntities;
      });

      if (user.authorities?.some((v) => v.name === AuthorityEntityNameEnum.OrdinaryUser)) {
        await userPropertyService.followPropertyReferenceUserentityGet21(id, options).then((v) => {
          user.group = v.data;
        });
      }

      if (user.authorities?.some((v) => v.name === AuthorityEntityNameEnum.VideoCreator)) {
        await userPropertyService.followPropertyReferenceUserentityGet31(id, options).then((v) => {
          user.videos = v.data._embedded?.videoEntities || [];
        });
      }

      return user;
    })
    .catch((err) => {
      throw err;
    });
};
