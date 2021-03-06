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
/**
 *
 * @export
 * @interface UserEntityRequestBody
 */
export interface UserEntityRequestBody {
  /**
   *
   * @type {string}
   * @memberof UserEntityRequestBody
   */
  username: string;
  /**
   *
   * @type {boolean}
   * @memberof UserEntityRequestBody
   */
  enabled: boolean;
  /**
   *
   * @type {boolean}
   * @memberof UserEntityRequestBody
   */
  accountNonExpired: boolean;
  /**
   *
   * @type {boolean}
   * @memberof UserEntityRequestBody
   */
  credentialsNonExpired: boolean;
  /**
   *
   * @type {boolean}
   * @memberof UserEntityRequestBody
   */
  accountNonLocked: boolean;
  /**
   *
   * @type {Array<string>}
   * @memberof UserEntityRequestBody
   */
  authorities: Array<string>;
  /**
   *
   * @type {string}
   * @memberof UserEntityRequestBody
   */
  group?: string;
  /**
   *
   * @type {string}
   * @memberof UserEntityRequestBody
   */
  name: string;
  /**
   *
   * @type {Array<string>}
   * @memberof UserEntityRequestBody
   */
  videos: Array<string>;
  /**
   *
   * @type {number}
   * @memberof UserEntityRequestBody
   */
  id?: number;
}

export function UserEntityRequestBodyFromJSON(json: any): UserEntityRequestBody {
  return UserEntityRequestBodyFromJSONTyped(json, false);
}

export function UserEntityRequestBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserEntityRequestBody {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    username: json['username'],
    enabled: json['enabled'],
    accountNonExpired: json['accountNonExpired'],
    credentialsNonExpired: json['credentialsNonExpired'],
    accountNonLocked: json['accountNonLocked'],
    authorities: json['authorities'],
    group: !exists(json, 'group') ? undefined : json['group'],
    name: json['name'],
    videos: json['videos'],
    id: !exists(json, 'id') ? undefined : json['id'],
  };
}

export function UserEntityRequestBodyToJSON(value?: UserEntityRequestBody | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    username: value.username,
    enabled: value.enabled,
    accountNonExpired: value.accountNonExpired,
    credentialsNonExpired: value.credentialsNonExpired,
    accountNonLocked: value.accountNonLocked,
    authorities: value.authorities,
    group: value.group,
    name: value.name,
    videos: value.videos,
    id: value.id,
  };
}
