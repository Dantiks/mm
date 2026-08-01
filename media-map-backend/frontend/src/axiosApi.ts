import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { apiURL } from './utils/constants';
import { RootState } from './app/store';
import { Store } from '@reduxjs/toolkit';

const axiosApi = axios.create({
  baseURL: apiURL,
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().users.user?.token;
    const openAiKey = localStorage.getItem('openai_api_key');
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', token);
    if (openAiKey) {
      headers.set('x-openai-key', openAiKey);
    }

    return config;
  });
};

export default axiosApi;
