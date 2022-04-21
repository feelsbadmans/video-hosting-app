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
import {
  UserGroupEntity,
  UserGroupEntityFromJSON,
  UserGroupEntityFromJSONTyped,
  UserGroupEntityToJSON,
} from './UserGroupEntity';

/**
 *
 * @export
 * @interface VideoEntity
 */
export interface VideoEntity {
  /**
   *
   * @type {string}
   * @memberof VideoEntity
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof VideoEntity
   */
  description: string;
  /**
   *
   * @type {string}
   * @memberof VideoEntity
   */
  source: string;
  /**
   *
   * @type {UserEntity}
   * @memberof VideoEntity
   */
  author?: UserEntity;
  /**
   *
   * @type {Set<UserGroupEntity>}
   * @memberof VideoEntity
   */
  allowedGroups?: Set<UserGroupEntity>;
  /**
   *
   * @type {number}
   * @memberof VideoEntity
   */
  id?: number;
}

export function VideoEntityFromJSON(json: any): VideoEntity {
  return VideoEntityFromJSONTyped(json, false);
}

export function VideoEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): VideoEntity {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: json['name'],
    description: json['description'],
    source: json['source'],
    author: !exists(json, 'author') ? undefined : UserEntityFromJSON(json['author']),
    allowedGroups: !exists(json, 'allowedGroups')
      ? undefined
      : new Set((json['allowedGroups'] as Array<any>).map(UserGroupEntityFromJSON)),
    id: !exists(json, 'id') ? undefined : json['id'],
  };
}

export function VideoEntityToJSON(value?: VideoEntity | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    description: value.description,
    source: value.source,
    author: UserEntityToJSON(value.author),
    allowedGroups:
      value.allowedGroups === undefined
        ? undefined
        : Array.from(value.allowedGroups as Set<any>).map(UserGroupEntityToJSON),
    id: value.id,
  };
}