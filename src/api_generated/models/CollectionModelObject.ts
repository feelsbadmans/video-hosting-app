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
  CollectionModelObjectEmbedded,
  CollectionModelObjectEmbeddedFromJSON,
  CollectionModelObjectEmbeddedFromJSONTyped,
  CollectionModelObjectEmbeddedToJSON,
} from './CollectionModelObjectEmbedded';
import { Link, LinkFromJSON, LinkFromJSONTyped, LinkToJSON } from './Link';

/**
 *
 * @export
 * @interface CollectionModelObject
 */
export interface CollectionModelObject {
  /**
   *
   * @type {CollectionModelObjectEmbedded}
   * @memberof CollectionModelObject
   */
  embedded?: CollectionModelObjectEmbedded;
  /**
   *
   * @type {{ [key: string]: Link; }}
   * @memberof CollectionModelObject
   */
  links?: { [key: string]: Link };
}

export function CollectionModelObjectFromJSON(json: any): CollectionModelObject {
  return CollectionModelObjectFromJSONTyped(json, false);
}

export function CollectionModelObjectFromJSONTyped(json: any, ignoreDiscriminator: boolean): CollectionModelObject {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    embedded: !exists(json, '_embedded') ? undefined : CollectionModelObjectEmbeddedFromJSON(json['_embedded']),
    links: !exists(json, '_links') ? undefined : mapValues(json['_links'], LinkFromJSON),
  };
}

export function CollectionModelObjectToJSON(value?: CollectionModelObject | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    _embedded: CollectionModelObjectEmbeddedToJSON(value.embedded),
    _links: value.links === undefined ? undefined : mapValues(value.links, LinkToJSON),
  };
}
