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

/**
 *
 */
export class TestApiApi extends runtime.BaseAPI {
  /**
   */
  async helloAdminRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<string>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/test`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.TextApiResponse(response) as any;
  }

  /**
   */
  async helloAdmin(initOverrides?: RequestInit): Promise<string> {
    const response = await this.helloAdminRaw(initOverrides);
    return await response.value();
  }
}
