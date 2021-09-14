import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  Redirect,
} from '@nestjs/common';
import _ from 'lodash';
import { SpotifyService } from './spotify.service';
import { isAuthorizeSuccessResult, AuthorizeResult } from '@sp-gram/spotify';

@Controller('/spotify')
export class SpotifyController {
  accessToken?: string;
  constructor(private spotifyService: SpotifyService) {}

  @Get('/login')
  @Redirect()
  onLogin() {
    const state = `467620958`;
    const { url } = this.spotifyService.getAuthorizationUrl({ state });
    return { url };
  }

  @Get('/callback')
  async onCallback(@Query() result: AuthorizeResult) {
    if (!isAuthorizeSuccessResult(result)) {
      throw new InternalServerErrorException('Could not authorize');
    }
    const tokens = await this.spotifyService.exchangeCodeForTokens(result);
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
