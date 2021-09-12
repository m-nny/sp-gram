import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyConfig = {
  clientId: process.env.SPOTIFY_CLIENT_ID || 'nope',
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET || 'nope',
  redirectUri: process.env.SPOTIFY_REDIRECT_URI || 'nope',
};

console.log({ spotifyConfig });

@Injectable()
export class SpotifyService {
  private webApi = new SpotifyWebApi(spotifyConfig);
  constructor() {}

  createAuthorizationUrl(state: string): string {
    const scopes = [
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing',
    ];
    const authorizeUrl = this.webApi.createAuthorizeURL(scopes, state);
    return authorizeUrl;
  }

  async exchangeCodeForTokens(code: string, saveToken = false) {
    const data = await this.webApi.authorizationCodeGrant(code);
    if (saveToken) {
      this.webApi.setAccessToken(data.body.access_token);
      this.webApi.setRefreshToken(data.body.refresh_token);
    }
    return data.body;
  }

  async getUserInfo() {
    const data = await this.webApi.getMe();
    return data.body;
  }
  async getUserDevices() {
    const data = await this.webApi.getMyDevices();
    return data.body;
  }
}
