import _ from 'lodash';
import dayjs from 'dayjs';
import { Injectable, Logger } from '@nestjs/common';
import {
  SpotifyWebApi,
  SpotifyWebApiConfig,
  AuthorizeArgs,
  AuthorizeSuccessResult,
  GetClientInfoArgs,
  ExchangeCodeResult,
} from '@sp-gram/spotify';
import { UserService } from '../user/user.service';
import { UserAuth } from '../user/schema/user-auth.schema';
import { UserInfoKey } from '../user/schema/user.schema';
import { RefreshTokenResult } from 'libs/spotify/src/lib/types/refresh-tokens';

const spotifyConfig: SpotifyWebApiConfig = {
  clientId: process.env.SPOTIFY_CLIENT_ID || 'nope',
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET || 'nope',
  scopes: [
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
  ],
  redirectUri: process.env.SPOTIFY_REDIRECT_URI || 'nope',
};

@Injectable()
export class SpotifyService {
  private webApi: SpotifyWebApi;
  private logger = new Logger(SpotifyService.name);
  constructor(private userService: UserService) {
    this.webApi = new SpotifyWebApi(spotifyConfig);
  }

  getAuthorizationUrl(args: AuthorizeArgs) {
    const url = this.webApi.getAuthorizationUrl(args);
    return { url };
  }

  async exchangeCodeForTokens({ code, state }: AuthorizeSuccessResult) {
    const tgId = _.toNumber(state);
    const tokens = await this.webApi.exchangeCodeForTokens({ code });

    await this.userService.saveTokens({ tgId }, hydrateUserAuth(tokens));

    return tokens;
  }
  async refreshTokens(key: UserInfoKey) {
    const user = await this.userService.findByTId(key);

    if (!user?.auth?.refreshToken) {
      this.logger.warn({ message: 'user got no refresh token', user });
      return null;
    }

    const refreshToken = user.auth.refreshToken;
    const tokens = await this.webApi.refreshToken({ refreshToken });

    console.log({ tokens });

    await this.userService.saveTokens(
      key,
      hydrateUserAuth(tokens, refreshToken)
    );

    return tokens;
  }
  async getClientInfo(args: GetClientInfoArgs) {
    return await this.webApi.getClientInfo(args);
  }
}

const hydrateUserAuth = (
  tokens: ExchangeCodeResult | RefreshTokenResult,
  refreshToken?: string
): UserAuth => ({
  accessToken: tokens.access_token,
  refreshToken: tokens.refresh_token || refreshToken || 'nope',
  expiresIn: dayjs().add(tokens.expires_in, 's').toDate(),
});
