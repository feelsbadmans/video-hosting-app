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
  CollectionModelEntityModelVideoEntity,
  CollectionModelEntityModelVideoEntityFromJSON,
  CollectionModelEntityModelVideoEntityToJSON,
  EntityModelVideoEntity,
  EntityModelVideoEntityFromJSON,
  EntityModelVideoEntityToJSON,
} from '../models';

export interface ExecuteSearchVideoentityGetRequest {
  username?: string;
}

export interface ExecuteSearchVideoentityGet1Request {
  name?: string;
}

export interface ExecuteSearchVideoentityGet2Request {
  searchName?: string;
}

/**
 *
 */
export class VideoEntitySearchControllerApi extends runtime.BaseAPI {
  /**
   */
  async executeSearchVideoentityGetRaw(
    requestParameters: ExecuteSearchVideoentityGetRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<CollectionModelEntityModelVideoEntity>> {
    const queryParameters: any = {};

    if (requestParameters.username !== undefined) {
      queryParameters['username'] = requestParameters.username;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/videos/search/findAllByAuthor_Username`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      CollectionModelEntityModelVideoEntityFromJSON(jsonValue),
    );
  }

  /**
   */
  async executeSearchVideoentityGet(
    requestParameters: ExecuteSearchVideoentityGetRequest = {},
    initOverrides?: RequestInit,
  ): Promise<CollectionModelEntityModelVideoEntity> {
    const response = await this.executeSearchVideoentityGetRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   */
  async executeSearchVideoentityGet1Raw(
    requestParameters: ExecuteSearchVideoentityGet1Request,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<EntityModelVideoEntity>> {
    const queryParameters: any = {};

    if (requestParameters.name !== undefined) {
      queryParameters['name'] = requestParameters.name;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/videos/search/findByName`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelVideoEntityFromJSON(jsonValue));
  }

  /**
   */
  async executeSearchVideoentityGet1(
    requestParameters: ExecuteSearchVideoentityGet1Request = {},
    initOverrides?: RequestInit,
  ): Promise<EntityModelVideoEntity> {
    const response = await this.executeSearchVideoentityGet1Raw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   */
  async executeSearchVideoentityGet2Raw(
    requestParameters: ExecuteSearchVideoentityGet2Request,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<EntityModelVideoEntity>> {
    const queryParameters: any = {};

    if (requestParameters.searchName !== undefined) {
      queryParameters['searchName'] = requestParameters.searchName;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/videos/search/findByNameContainingIgnoreCase`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelVideoEntityFromJSON(jsonValue));
  }

  /**
   */
  async executeSearchVideoentityGet2(
    requestParameters: ExecuteSearchVideoentityGet2Request = {},
    initOverrides?: RequestInit,
  ): Promise<EntityModelVideoEntity> {
    const response = await this.executeSearchVideoentityGet2Raw(requestParameters, initOverrides);
    return await response.value();
  }
}
