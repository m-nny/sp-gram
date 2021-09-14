export type ExchangeCodeArgs = {
  code: string;
};
export type ExchangeCodeResult = {
  access_token: string;
  token_type: 'Bearer';
  scope: string;
  expires_in: number; // seconds before expires
  refresh_token: string;
};
