import axios, { AxiosRequestConfig } from 'axios';

const BASE_PATH = 'https://video-hosting-back.herokuapp.com';

const defaultConfig: AxiosRequestConfig = {
  baseURL: BASE_PATH,
  withCredentials: true,
};

const otherConfig: AxiosRequestConfig = {
  baseURL: BASE_PATH,
  withCredentials: true,
  headers: {
    'Content-Type': 'text/uri-list',
  },
};

const fileConfig: AxiosRequestConfig = {
  baseURL: BASE_PATH,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

const tokenInjection = (config: AxiosRequestConfig<unknown>) => {
  const accessToken = localStorage.getItem('token');

  if (accessToken) {
    config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` };
  }

  return config;
};

export const globalAxios = axios.create(defaultConfig);
export const otherAxios = axios.create(otherConfig);
export const fileAxios = axios.create(fileConfig);

globalAxios.interceptors.request.use(tokenInjection);
otherAxios.interceptors.request.use(tokenInjection);
fileAxios.interceptors.request.use(tokenInjection);

//import { globalAxios } from "api/axios";
