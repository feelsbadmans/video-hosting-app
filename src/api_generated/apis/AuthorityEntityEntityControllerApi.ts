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
  AuthorityEntityRequestBody,
  AuthorityEntityRequestBodyFromJSON,
  AuthorityEntityRequestBodyToJSON,
  EntityModelAuthorityEntity,
  EntityModelAuthorityEntityFromJSON,
  EntityModelAuthorityEntityToJSON,
  PagedModelEntityModelAuthorityEntity,
  PagedModelEntityModelAuthorityEntityFromJSON,
  PagedModelEntityModelAuthorityEntityToJSON,
} from '../models';

export interface DeleteItemResourceAuthorityentityDeleteRequest {
  id: string;
}

export interface GetCollectionResourceAuthorityentityGet1Request {
  page?: number;
  size?: number;
  sort?: Array<string>;
}

export interface GetItemResourceAuthorityentityGetRequest {
  id: string;
}

export interface PatchItemResourceAuthorityentityPatchRequest {
  id: string;
  authorityEntityRequestBody: AuthorityEntityRequestBody;
}

export interface PostCollectionResourceAuthorityentityPostRequest {
  authorityEntityRequestBody: AuthorityEntityRequestBody;
}

export interface PutItemResourceAuthorityentityPutRequest {
  id: string;
  authorityEntityRequestBody: AuthorityEntityRequestBody;
}

/**
 *
 */
export class AuthorityEntityEntityControllerApi extends runtime.BaseAPI {
  /**
   * delete-authorityentity
   */
  async deleteItemResourceAuthorityentityDeleteRaw(
    requestParameters: DeleteItemResourceAuthorityentityDeleteRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling deleteItemResourceAuthorityentityDelete.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/authorityEntities/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
        method: 'DELETE',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * delete-authorityentity
   */
  async deleteItemResourceAuthorityentityDelete(
    requestParameters: DeleteItemResourceAuthorityentityDeleteRequest,
    initOverrides?: RequestInit,
  ): Promise<void> {
    await this.deleteItemResourceAuthorityentityDeleteRaw(requestParameters, initOverrides);
  }

  /**
   * get-authorityentity
   */
  async getCollectionResourceAuthorityentityGet1Raw(
    requestParameters: GetCollectionResourceAuthorityentityGet1Request,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<PagedModelEntityModelAuthorityEntity>> {
    const queryParameters: any = {};

    if (requestParameters.page !== undefined) {
      queryParameters['page'] = requestParameters.page;
    }

    if (requestParameters.size !== undefined) {
      queryParameters['size'] = requestParameters.size;
    }

    if (requestParameters.sort) {
      queryParameters['sort'] = requestParameters.sort;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/authorityEntities`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      PagedModelEntityModelAuthorityEntityFromJSON(jsonValue),
    );
  }

  /**
   * get-authorityentity
   */
  async getCollectionResourceAuthorityentityGet1(
    requestParameters: GetCollectionResourceAuthorityentityGet1Request = {},
    initOverrides?: RequestInit,
  ): Promise<PagedModelEntityModelAuthorityEntity> {
    const response = await this.getCollectionResourceAuthorityentityGet1Raw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * get-authorityentity
   */
  async getItemResourceAuthorityentityGetRaw(
    requestParameters: GetItemResourceAuthorityentityGetRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<EntityModelAuthorityEntity>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling getItemResourceAuthorityentityGet.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/authorityEntities/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelAuthorityEntityFromJSON(jsonValue));
  }

  /**
   * get-authorityentity
   */
  async getItemResourceAuthorityentityGet(
    requestParameters: GetItemResourceAuthorityentityGetRequest,
    initOverrides?: RequestInit,
  ): Promise<EntityModelAuthorityEntity> {
    const response = await this.getItemResourceAuthorityentityGetRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * patch-authorityentity
   */
  async patchItemResourceAuthorityentityPatchRaw(
    requestParameters: PatchItemResourceAuthorityentityPatchRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<EntityModelAuthorityEntity>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling patchItemResourceAuthorityentityPatch.',
      );
    }

    if (
      requestParameters.authorityEntityRequestBody === null ||
      requestParameters.authorityEntityRequestBody === undefined
    ) {
      throw new runtime.RequiredError(
        'authorityEntityRequestBody',
        'Required parameter requestParameters.authorityEntityRequestBody was null or undefined when calling patchItemResourceAuthorityentityPatch.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/authorityEntities/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
        method: 'PATCH',
        headers: headerParameters,
        query: queryParameters,
        body: AuthorityEntityRequestBodyToJSON(requestParameters.authorityEntityRequestBody),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelAuthorityEntityFromJSON(jsonValue));
  }

  /**
   * patch-authorityentity
   */
  async patchItemResourceAuthorityentityPatch(
    requestParameters: PatchItemResourceAuthorityentityPatchRequest,
    initOverrides?: RequestInit,
  ): Promise<EntityModelAuthorityEntity> {
    const response = await this.patchItemResourceAuthorityentityPatchRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * create-authorityentity
   */
  async postCollectionResourceAuthorityentityPostRaw(
    requestParameters: PostCollectionResourceAuthorityentityPostRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<EntityModelAuthorityEntity>> {
    if (
      requestParameters.authorityEntityRequestBody === null ||
      requestParameters.authorityEntityRequestBody === undefined
    ) {
      throw new runtime.RequiredError(
        'authorityEntityRequestBody',
        'Required parameter requestParameters.authorityEntityRequestBody was null or undefined when calling postCollectionResourceAuthorityentityPost.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/authorityEntities`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: AuthorityEntityRequestBodyToJSON(requestParameters.authorityEntityRequestBody),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelAuthorityEntityFromJSON(jsonValue));
  }

  /**
   * create-authorityentity
   */
  async postCollectionResourceAuthorityentityPost(
    requestParameters: PostCollectionResourceAuthorityentityPostRequest,
    initOverrides?: RequestInit,
  ): Promise<EntityModelAuthorityEntity> {
    const response = await this.postCollectionResourceAuthorityentityPostRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * update-authorityentity
   */
  async putItemResourceAuthorityentityPutRaw(
    requestParameters: PutItemResourceAuthorityentityPutRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<EntityModelAuthorityEntity>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling putItemResourceAuthorityentityPut.',
      );
    }

    if (
      requestParameters.authorityEntityRequestBody === null ||
      requestParameters.authorityEntityRequestBody === undefined
    ) {
      throw new runtime.RequiredError(
        'authorityEntityRequestBody',
        'Required parameter requestParameters.authorityEntityRequestBody was null or undefined when calling putItemResourceAuthorityentityPut.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/authorityEntities/{id}`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
        method: 'PUT',
        headers: headerParameters,
        query: queryParameters,
        body: AuthorityEntityRequestBodyToJSON(requestParameters.authorityEntityRequestBody),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => EntityModelAuthorityEntityFromJSON(jsonValue));
  }

  /**
   * update-authorityentity
   */
  async putItemResourceAuthorityentityPut(
    requestParameters: PutItemResourceAuthorityentityPutRequest,
    initOverrides?: RequestInit,
  ): Promise<EntityModelAuthorityEntity> {
    const response = await this.putItemResourceAuthorityentityPutRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
