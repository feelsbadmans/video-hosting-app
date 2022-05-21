import { UserProfile } from 'api/userProfile';
import { EntityModelAuthorityEntity } from 'api_generated';

import { UserFormType } from './types';

const AUTHORITIES: { [key: EntityModelAuthorityEntity['authority']]: string } = {
  ORDINARY_USER: 'https://video-hosting-back.herokuapp.com/authorityEntity/1',
  VIDEO_CREATOR: 'https://video-hosting-back.herokuapp.com/authorityEntity/2',
  ADMIN: 'https://video-hosting-back.herokuapp.com/authorityEntity/3',
};

export const AUTHORITIES_LABELS = [
  {
    label: 'Пользователь',
    value: 'https://video-hosting-back.herokuapp.com/authorityEntity/1',
  },
  {
    label: 'Контентмейкер',
    value: 'https://video-hosting-back.herokuapp.com/authorityEntity/2',
  },
  {
    label: 'Модератор',
    value: 'https://video-hosting-back.herokuapp.com/authorityEntity/3',
  },
];

export const getInitUserValues = (user: UserProfile): UserFormType => {
  return {
    username: user.username,
    authorities: user?.authorities?.map((v) => AUTHORITIES[v.name]) || ['Пользователь'],
    group: `https://video-hosting-back.herokuapp.com/user-groups/${user.group?.id || 1}`,
    locked: !user.accountNonLocked,
  };
};
