import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Redirect,
} from '@nestjs/common';
import _ from 'lodash';
import { SpotifyService } from './spotify.service';
import {
  isSwagAuthorizeCallbackSuccessResult,
  SwagAuthorizeCallbackResult,
} from '@sp-gram/spotify';

@Controller('/spotify')
export class SpotifyController {
  accessToken?: string;
  constructor(private spotifyService: SpotifyService) {}

  @Get('/login')
  @Redirect()
  onLogin() {
    const state = `m-nny`;
    const url = this.spotifyService.getAuthorizationUrl({ state });
    return { url };
  }

  @Get('/callback')
  async onCallback(@Query() callbackResult: SwagAuthorizeCallbackResult) {
    console.log({ query: callbackResult });
    if (!isSwagAuthorizeCallbackSuccessResult(callbackResult)) {
      throw new BadRequestException(callbackResult, 'Could not authorize');
    }
    const code = callbackResult.code;
    const tokens = await this.spotifyService.exchangeCodeForTokens({ code });
    this.accessToken = tokens.access_token;
    return tokens;
  }

  @Get('/me')
  onMe() {
    const accessToken = this.accessToken;
    if (!accessToken) {
      throw new BadRequestException('No access token was found');
    }
    return this.spotifyService.getClientInfo({ accessToken });
  }
}
