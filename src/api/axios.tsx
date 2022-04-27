import axios from 'axios';

const BASE_PATH = 'https://video-hosting-back.herokuapp.com';

export const globalAxios = axios.create({
  baseURL: BASE_PATH,
  withCredentials: true,
});

//import { globalAxios } from "api/axios";
