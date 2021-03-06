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
  CollectionModelObject,
  CollectionModelObjectFromJSON,
  CollectionModelObjectToJSON,
  CollectionModelUserEntity,
  CollectionModelUserEntityFromJSON,
  CollectionModelUserEntityToJSON,
} from '../models';

export interface CreatePropertyReferenceUsergroupentityPatchRequest {
  id: string;
  collectionModelObject: CollectionModelObject;
}

export interface CreatePropertyReferenceUsergroupentityPutRequest {
  id: string;
  collectionModelObject: CollectionModelObject;
}

export interface DeletePropertyReferenceIdUsergroupentityDeleteRequest {
  id: string;
  propertyId: string;
}

export interface DeletePropertyReferenceUsergroupentityDeleteRequest {
  id: string;
}

export interface FollowPropertyReferenceUsergroupentityGetRequest {
  id: string;
  propertyId: string;
}

export interface FollowPropertyReferenceUsergroupentityGet1Request {
  id: string;
}

/**
 *
 */
export class UserGroupEntityPropertyReferenceControllerApi extends runtime.BaseAPI {
  /**
   * patch-userentity-by-usergroupentity-Id
   */
  async createPropertyReferenceUsergroupentityPatchRaw(
    requestParameters: CreatePropertyReferenceUsergroupentityPatchRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<CollectionModelUserEntity>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling createPropertyReferenceUsergroupentityPatch.',
      );
    }

    if (requestParameters.collectionModelObject === null || requestParameters.collectionModelObject === undefined) {
      throw new runtime.RequiredError(
        'collectionModelObject',
        'Required parameter requestParameters.collectionModelObject was null or undefined when calling createPropertyReferenceUsergroupentityPatch.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/user-groups/{id}/users`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
        method: 'PATCH',
        headers: headerParameters,
        query: queryParameters,
        body: CollectionModelObjectToJSON(requestParameters.collectionModelObject),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => CollectionModelUserEntityFromJSON(jsonValue));
  }

  /**
   * patch-userentity-by-usergroupentity-Id
   */
  async createPropertyReferenceUsergroupentityPatch(
    requestParameters: CreatePropertyReferenceUsergroupentityPatchRequest,
    initOverrides?: RequestInit,
  ): Promise<CollectionModelUserEntity> {
    const response = await this.createPropertyReferenceUsergroupentityPatchRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * update-userentity-by-usergroupentity-Id
   */
  async createPropertyReferenceUsergroupentityPutRaw(
    requestParameters: CreatePropertyReferenceUsergroupentityPutRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<CollectionModelUserEntity>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling createPropertyReferenceUsergroupentityPut.',
      );
    }

    if (requestParameters.collectionModelObject === null || requestParameters.collectionModelObject === undefined) {
      throw new runtime.RequiredError(
        'collectionModelObject',
        'Required parameter requestParameters.collectionModelObject was null or undefined when calling createPropertyReferenceUsergroupentityPut.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/user-groups/{id}/users`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
        method: 'PUT',
        headers: headerParameters,
        query: queryParameters,
        body: CollectionModelObjectToJSON(requestParameters.collectionModelObject),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => CollectionModelUserEntityFromJSON(jsonValue));
  }

  /**
   * update-userentity-by-usergroupentity-Id
   */
  async createPropertyReferenceUsergroupentityPut(
    requestParameters: CreatePropertyReferenceUsergroupentityPutRequest,
    initOverrides?: RequestInit,
  ): Promise<CollectionModelUserEntity> {
    const response = await this.createPropertyReferenceUsergroupentityPutRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * delete-userentity-by-usergroupentity-Id
   */
  async deletePropertyReferenceIdUsergroupentityDeleteRaw(
    requestParameters: DeletePropertyReferenceIdUsergroupentityDeleteRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling deletePropertyReferenceIdUsergroupentityDelete.',
      );
    }

    if (requestParameters.propertyId === null || requestParameters.propertyId === undefined) {
      throw new runtime.RequiredError(
        'propertyId',
        'Required parameter requestParameters.propertyId was null or undefined when calling deletePropertyReferenceIdUsergroupentityDelete.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/user-groups/{id}/users/{propertyId}`
          .replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id)))
          .replace(`{${'propertyId'}}`, encodeURIComponent(String(requestParameters.propertyId))),
        method: 'DELETE',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * delete-userentity-by-usergroupentity-Id
   */
  async deletePropertyReferenceIdUsergroupentityDelete(
    requestParameters: DeletePropertyReferenceIdUsergroupentityDeleteRequest,
    initOverrides?: RequestInit,
  ): Promise<void> {
    await this.deletePropertyReferenceIdUsergroupentityDeleteRaw(requestParameters, initOverrides);
  }

  /**
   * delete-userentity-by-usergroupentity-Id
   */
  async deletePropertyReferenceUsergroupentityDeleteRaw(
    requestParameters: DeletePropertyReferenceUsergroupentityDeleteRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling deletePropertyReferenceUsergroupentityDelete.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/user-groups/{id}/users`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
        method: 'DELETE',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * delete-userentity-by-usergroupentity-Id
   */
  async deletePropertyReferenceUsergroupentityDelete(
    requestParameters: DeletePropertyReferenceUsergroupentityDeleteRequest,
    initOverrides?: RequestInit,
  ): Promise<void> {
    await this.deletePropertyReferenceUsergroupentityDeleteRaw(requestParameters, initOverrides);
  }

  /**
   * get-userentity-by-usergroupentity-Id
   */
  async followPropertyReferenceUsergroupentityGetRaw(
    requestParameters: FollowPropertyReferenceUsergroupentityGetRequest,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<CollectionModelUserEntity>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling followPropertyReferenceUsergroupentityGet.',
      );
    }

    if (requestParameters.propertyId === null || requestParameters.propertyId === undefined) {
      throw new runtime.RequiredError(
        'propertyId',
        'Required parameter requestParameters.propertyId was null or undefined when calling followPropertyReferenceUsergroupentityGet.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/user-groups/{id}/users/{propertyId}`
          .replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id)))
          .replace(`{${'propertyId'}}`, encodeURIComponent(String(requestParameters.propertyId))),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => CollectionModelUserEntityFromJSON(jsonValue));
  }

  /**
   * get-userentity-by-usergroupentity-Id
   */
  async followPropertyReferenceUsergroupentityGet(
    requestParameters: FollowPropertyReferenceUsergroupentityGetRequest,
    initOverrides?: RequestInit,
  ): Promise<CollectionModelUserEntity> {
    const response = await this.followPropertyReferenceUsergroupentityGetRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * get-userentity-by-usergroupentity-Id
   */
  async followPropertyReferenceUsergroupentityGet1Raw(
    requestParameters: FollowPropertyReferenceUsergroupentityGet1Request,
    initOverrides?: RequestInit,
  ): Promise<runtime.ApiResponse<CollectionModelUserEntity>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling followPropertyReferenceUsergroupentityGet1.',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/user-groups/{id}/users`.replace(`{${'id'}}`, encodeURIComponent(String(requestParameters.id))),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => CollectionModelUserEntityFromJSON(jsonValue));
  }

  /**
   * get-userentity-by-usergroupentity-Id
   */
  async followPropertyReferenceUsergroupentityGet1(
    requestParameters: FollowPropertyReferenceUsergroupentityGet1Request,
    initOverrides?: RequestInit,
  ): Promise<CollectionModelUserEntity> {
    const response = await this.followPropertyReferenceUsergroupentityGet1Raw(requestParameters, initOverrides);
    return await response.value();
  }
}
