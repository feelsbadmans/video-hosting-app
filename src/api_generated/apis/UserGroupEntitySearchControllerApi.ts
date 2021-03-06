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

import * as runtime from '../runtime';
import {
  EntityModelUserGroupEntity,
  EntityModelUserGroupEntityFromJSON,
  EntityModelUserGroupEntityToJSON,
} from '../models';

export interface ExecuteSearchUsergroupentityGetRequest {
  name?: string;
}

/**
 *
 */
export class UserGroupEntitySearchControllerApi extends runtime.BaseAPI {
  /**
   */
  async executeSearchUsergroupentityGetRaw(
    requestParameters: ExecuteSearchUsergroupentityGetRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<EntityModelUserGroupEntity>> {
    const queryParameters: any = {};

    if (requestParameters.name !== undefined) {
      queryParameters['name'] = requestParameters.name;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/user-groups/search/findByName`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelUserGroupEntityFromJSON(jsonValue));
  }

  /**
   */
  async executeSearchUsergroupentityGet(
    requestParameters: ExecuteSearchUsergroupentityGetRequest = {},
    initOverrides?: RequestInit,
  ): Promise<EntityModelUserGroupEntity> {
    const response = await this.executeSearchUsergroupentityGetRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
