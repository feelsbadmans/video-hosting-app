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
import {
  CollectionModelEntityModelUserGroupEntityEmbedded,
  CollectionModelEntityModelUserGroupEntityEmbeddedFromJSON,
  CollectionModelEntityModelUserGroupEntityEmbeddedFromJSONTyped,
  CollectionModelEntityModelUserGroupEntityEmbeddedToJSON,
} from './CollectionModelEntityModelUserGroupEntityEmbedded';
import { Link, LinkFromJSON, LinkFromJSONTyped, LinkToJSON } from './Link';

/**
 *
 * @export
 * @interface CollectionModelEntityModelUserGroupEntity
 */
export interface CollectionModelEntityModelUserGroupEntity {
  /**
   *
   * @type {CollectionModelEntityModelUserGroupEntityEmbedded}
   * @memberof CollectionModelEntityModelUserGroupEntity
   */
  embedded?: CollectionModelEntityModelUserGroupEntityEmbedded;
  /**
   *
   * @type {{ [key: string]: Link; }}
   * @memberof CollectionModelEntityModelUserGroupEntity
   */
  links?: { [key: string]: Link };
}

export function CollectionModelEntityModelUserGroupEntityFromJSON(
  json: any,
): CollectionModelEntityModelUserGroupEntity {
  return CollectionModelEntityModelUserGroupEntityFromJSONTyped(json, false);
}

export function CollectionModelEntityModelUserGroupEntityFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CollectionModelEntityModelUserGroupEntity {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    embedded: !exists(json, '_embedded')
      ? undefined
      : CollectionModelEntityModelUserGroupEntityEmbeddedFromJSON(json['_embedded']),
    links: !exists(json, '_links') ? undefined : mapValues(json['_links'], LinkFromJSON),
  };
}

export function CollectionModelEntityModelUserGroupEntityToJSON(
  value?: CollectionModelEntityModelUserGroupEntity | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    _embedded: CollectionModelEntityModelUserGroupEntityEmbeddedToJSON(value.embedded),
    _links: value.links === undefined ? undefined : mapValues(value.links, LinkToJSON),
  };
}
