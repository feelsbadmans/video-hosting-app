/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import { UserEntity, UserEntityFromJSON, UserEntityFromJSONTyped, UserEntityToJSON } from './UserEntity';

/**
 *
 * @export
 * @interface UserGroupEntity
 */
export interface UserGroupEntity {
  /**
   *
   * @type {string}
   * @memberof UserGroupEntity
   */
  name: string;
  /**
   *
   * @type {Array<UserEntity>}
   * @memberof UserGroupEntity
   */
  users: Array<UserEntity>;
  /**
   *
   * @type {number}
   * @memberof UserGroupEntity
   */
  id?: number;
}

export function UserGroupEntityFromJSON(json: any): UserGroupEntity {
  return UserGroupEntityFromJSONTyped(json, false);
}

export function UserGroupEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserGroupEntity {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: json['name'],
    users: (json['users'] as Array<any>).map(UserEntityFromJSON),
    id: !exists(json, 'id') ? undefined : json['id'],
  };
}

export function UserGroupEntityToJSON(value?: UserGroupEntity | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    users: (value.users as Array<any>).map(UserEntityToJSON),
    id: value.id,
  };
}
