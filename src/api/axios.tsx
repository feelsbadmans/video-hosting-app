import axios, { AxiosRequestHeaders } from 'axios';

const BASE_PATH = 'https://video-hosting-back.herokuapp.com';
const token = localStorage.getItem('token') || '';

export const AXIOS_HEADERS = token
  ? {
      Authorization: `Bearer ${token}`,
    }
  : ({} as AxiosRequestHeaders);

export const globalAxios = axios.create({
  baseURL: BASE_PATH,
  withCredentials: true,
  headers: AXIOS_HEADERS,
});

//import { globalAxios } from "api/axios";
