export type GetClientInfoArgs = { accessToken: string };

export type UserPrivateInfo = {
  country: string;
  explicit_content: unknown;
  product: 'premium' | 'free' | 'open';
};
export type UserEmailInfo = {
  email: string;
};

export type UserPublicInfo = {
  display_name: string | null;
  external_urls: { spotify: string };
  followers: { href: null; total: number };
  href: string;
  id: string;
  images: Array<{
    height: number | null;
    url: string;
    width: number | null;
  }>;
  type: 'user';
  uri: string;
};

export type GetClientInfoResult = UserPublicInfo &
  Partial<UserPrivateInfo> &
  Partial<UserEmailInfo>;
