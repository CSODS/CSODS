export type SignInRequest = {
  identifier: string;
  password: string;
  isPersistentAuth?: boolean;
};

export type SignInResponse = {
  accessToken: string;
};
