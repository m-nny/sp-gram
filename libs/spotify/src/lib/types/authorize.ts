import _ from 'lodash';
import { SpotifyWebApiConfig } from './config';

export type SwagAuthorizeArgs = {
  state?: string;
} & Partial<SpotifyWebApiConfig>;

export type SwagAuthorizeCallbackSuccessResult = {
  code: string;
  state: string;
};
export type SwagAuthorizeCallbackErrorResult = {
  error: string;
  state: string;
};
export type SwagAuthorizeCallbackResult =
  | SwagAuthorizeCallbackSuccessResult
  | SwagAuthorizeCallbackErrorResult;

export const isSwagAuthorizeCallbackSuccessResult = (
  obj: any
): obj is SwagAuthorizeCallbackSuccessResult =>
  _.isString(obj?.code) && _.isString(obj?.state);
