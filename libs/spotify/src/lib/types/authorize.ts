import _ from 'lodash';
import { SpotifyWebApiConfig } from './config';

export type AuthorizeArgs = {
  state?: string;
} & Partial<SpotifyWebApiConfig>;

export type AuthorizeSuccessResult = {
  code: string;
  state: string;
};
export type AuthorizeErrorResult = {
  error: string;
  state: string;
};
export type AuthorizeResult = AuthorizeSuccessResult | AuthorizeErrorResult;

export const isAuthorizeSuccessResult = (
  obj: any
): obj is AuthorizeSuccessResult =>
  _.isString(obj?.code) && _.isString(obj?.state);
