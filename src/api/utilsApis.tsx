import { UserGroupEntityEntityControllerApi } from 'api_generated';

const groupService = new UserGroupEntityEntityControllerApi();

export const getAllGroups = async () => {
  const res = await groupService.getCollectionResourceUsergroupentityGet1();

  return res.data._embedded?.userGroupEntities?.map((v) => ({ label: v.name, value: v._links?.self.href || '' }));
};
