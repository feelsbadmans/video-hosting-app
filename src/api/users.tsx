import { PageMetadata, UserEntityEntityControllerApi } from 'api_generated';

import { UserFormType } from 'components/UserEditModal/types';

import { otherAxios } from './axios';
import { UserProfile } from './userProfile';

const usersService = new UserEntityEntityControllerApi();

//TODO: заменить эту шнягу
export const getAllUsers = async (pageInfo?: PageMetadata) => {
  const response = await usersService
    .getCollectionResourceUserentityGet1(pageInfo?.number, pageInfo?.size, ['id'])
    .then((res) => ({
      users: res.data._embedded?.userEntities?.map(
        (v) =>
          ({
            ...v,
            id: Number((v?._links?.self.href as string).split('/').pop()),
          } as unknown as UserProfile),
      ),
      pageInfo: res.data.page,
    }))
    .then((res) => {
      return {
        ...res,
        users: Promise.all(
          (res.users as UserProfile[]).map((user) => {
            return usersService
              .getItemResourceUserentityGet(String(user.id))
              .then((res) => res.data as unknown as UserProfile);
          }),
        ),
      };
    })
    .catch((err) => {
      throw err;
    });
  const users = (await response.users) as UserProfile[];

  return {
    ...response,
    users,
  };
};

const addGroup = (group: string, id: number) => {
  return otherAxios.put(`/users/${id}/group`, group);
};

const addAuthorities = (authorities: string[], id: number) => {
  return otherAxios.put(`/users/${id}/authorities`, authorities.join('\n'));
};

export const updateUser = async (options: UserFormType, id: number) => {
  await usersService
    .patchItemResourceUserentityPatch(String(id), {
      username: options.username,
      accountNonLocked: !options.locked,
      enabled: true,
      accountNonExpired: true,
      credentialsNonExpired: false,
    })
    .catch((err) => {
      throw err;
    });
  await addAuthorities(options.authorities, id).catch((err) => {
    throw err;
  });
  await addGroup(options.group, id).catch((err) => {
    throw err;
  });
};
