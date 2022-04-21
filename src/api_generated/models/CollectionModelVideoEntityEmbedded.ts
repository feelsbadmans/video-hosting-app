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
  VideoEntityResponse,
  VideoEntityResponseFromJSON,
  VideoEntityResponseFromJSONTyped,
  VideoEntityResponseToJSON,
} from './VideoEntityResponse';

/**
 *
 * @export
 * @interface CollectionModelVideoEntityEmbedded
 */
export interface CollectionModelVideoEntityEmbedded {
  /**
   *
   * @type {Array<VideoEntityResponse>}
   * @memberof CollectionModelVideoEntityEmbedded
   */
  videoEntities?: Array<VideoEntityResponse>;
}

export function CollectionModelVideoEntityEmbeddedFromJSON(json: any): CollectionModelVideoEntityEmbedded {
  return CollectionModelVideoEntityEmbeddedFromJSONTyped(json, false);
}

export function CollectionModelVideoEntityEmbeddedFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CollectionModelVideoEntityEmbedded {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    videoEntities: !exists(json, 'videoEntities')
      ? undefined
      : (json['videoEntities'] as Array<any>).map(VideoEntityResponseFromJSON),
  };
}

export function CollectionModelVideoEntityEmbeddedToJSON(value?: CollectionModelVideoEntityEmbedded | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    videoEntities:
      value.videoEntities === undefined
        ? undefined
        : (value.videoEntities as Array<any>).map(VideoEntityResponseToJSON),
  };
}