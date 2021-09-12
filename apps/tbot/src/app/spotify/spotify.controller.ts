import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Redirect,
} from '@nestjs/common';
import _ from 'lodash';
import { SpotifyService } from './spotify.service';

const possible =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const getRandomString = (sampleSize: number): string =>
  _.sampleSize(possible, sampleSize).join('');

type SpotifyCallbackErrorResult = {
  state?: string;
  error: string;
};

type SpotifyCallbackSuccessResult = {
  state?: string;
  code: string;
};

type SpotifyCallbackResult =
  | SpotifyCallbackSuccessResult
  | SpotifyCallbackErrorResult;

export const isSuccessResult = (
  obj: any
): obj is SpotifyCallbackSuccessResult => _.isString(obj.code);

@Controller('/spotify')
export class SpotifyController {
  constructor(private spotifyService: SpotifyService) {}

  @Get('/login')
  @Redirect()
  onLogin() {
    const state = getRandomString(16);
    const url = this.spotifyService.createAuthorizationUrl(state);
    return { url };
  }

  @Get('/callback')
  async onCallback(@Query() callbackResult: SpotifyCallbackResult) {
    console.log({ query: callbackResult });
    if (!isSuccessResult(callbackResult)) {
      throw new BadRequestException(callbackResult, 'Could not authorize');
    }
    const tokens = await this.spotifyService.exchangeCodeForTokens(
      callbackResult.code,
      true
    );

    return tokens;
  }
  @Get('/me/devices')
  onMyDevices() {
    return this.spotifyService.getUserDevices();
  }

  @Get('/me')
  onMe() {
    return this.spotifyService.getUserInfo();
  }
}
