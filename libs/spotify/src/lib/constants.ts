import { AxiosRequestConfig } from 'axios';

export const accountsUrl = 'https://accounts.spotify.com/';
export const webApiUrl = 'https://api.spotify.com/';

export const defaultAxiosConfig: AxiosRequestConfig = {
  timeout: 10 * 1000,
};
