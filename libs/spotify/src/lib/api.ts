import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import _ from 'lodash';
import qs from 'query-string';
import { accountsUrl, defaultAxiosConfig, webApiUrl } from './constants';
import { SpotifyWebApiConfig, AuthorizeArgs } from './types';
import { ExchangeCodeArgs, ExchangeCodeResult } from './types/exchange-tokens';
import {
  GetClientInfoArgs,
  GetClientInfoResult,
} from './types/get-client-info';
import { toBase64 } from './utils';

export class SpotifyWebApi {
  private accountsApi: AxiosInstance;
  private webApi: AxiosInstance;
  constructor(
    private config: SpotifyWebApiConfig,
    axiosConfig?: AxiosRequestConfig
  ) {
    this.accountsApi = axios.create(
      _.merge({ baseURL: accountsUrl }, defaultAxiosConfig, axiosConfig)
    );
    this.webApi = axios.create(
      _.merge({ baseURL: webApiUrl }, defaultAxiosConfig, axiosConfig)
    );
  }

  public getAuthorizationUrl = ({
    state,
    ...config
  }: AuthorizeArgs): string => {
    config = _.merge(config, this.config);
    const query = {
      client_id: config.clientId,
      response_type: 'code',
      redirect_uri: config.redirectUri,
      state,
      scope: config.scopes.join(' '),
      show_dialog: false,
    };
    const url = `${accountsUrl}authorize`;
    console.log({ url, query });
    return qs.stringifyUrl({ url, query });
  };

  private getHeaders = (accessToken?: string) => {
    if (accessToken) {
      accessToken = `Bearer ` + accessToken;
    } else {
      accessToken =
        `Basic ` +
        toBase64(`${this.config.clientId}:${this.config.clientSecret}`);
    }
    return { Authorization: accessToken };
  };

  public exchangeCodeForTokens = ({
    code,
  }: ExchangeCodeArgs): Promise<ExchangeCodeResult> =>
    this.accountsApi
      .request<ExchangeCodeResult>({
        method: 'POST',
        url: `/api/token`,
        headers: this.getHeaders(),
        data: qs.stringify({
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.config.redirectUri,
        }),
      })
      .then((res) => res.data)
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          console.log(e.toJSON());
          console.log(e.response.data);
        }
        throw e;
      });
  public getClientInfo = ({
    accessToken,
  }: GetClientInfoArgs): Promise<GetClientInfoResult> =>
    this.webApi
      .request<GetClientInfoResult>({
        method: 'GET',
        url: `/v1/me`,
        headers: this.getHeaders(accessToken),
      })
      .then((res) => res.data)
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          console.log(e.toJSON());
          console.log(e.response.data);
        }
        throw e;
      });
}
