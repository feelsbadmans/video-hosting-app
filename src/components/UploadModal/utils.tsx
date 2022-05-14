import { UserGroupEntity } from 'api_generated';

export const getInitGroups = (groups: Set<UserGroupEntity> | undefined): string[] => {
  if (!groups) {
    return [];
  }

  return Array.from(groups).map((v) => `https://video-hosting-back.herokuapp.com/user-groups/${v?.id || 1}`);
};
