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
 * @interface LoginUserDto
 */
export interface LoginUserDto {
  /**
   *
   * @type {string}
   * @memberof LoginUserDto
   */
  username: string;
  /**
   *
   * @type {string}
   * @memberof LoginUserDto
   */
  password: string;
}

export function LoginUserDtoFromJSON(json: any): LoginUserDto {
  return LoginUserDtoFromJSONTyped(json, false);
}

export function LoginUserDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): LoginUserDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    username: json['username'],
    password: json['password'],
  };
}

export function LoginUserDtoToJSON(value?: LoginUserDto | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    username: value.username,
    password: value.password,
  };
}
