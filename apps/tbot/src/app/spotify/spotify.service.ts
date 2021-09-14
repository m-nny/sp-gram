import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { SpotifyWebApi, SpotifyWebApiConfig } from '@sp-gram/spotify';

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
export class SpotifyService extends SpotifyWebApi {
  constructor() {
    super(spotifyConfig);
  }
}
