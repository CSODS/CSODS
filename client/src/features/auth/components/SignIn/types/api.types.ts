export type SignInRequest = {
  identifier: string;
  password: string;
};

export type SignInResponse = {
  accessToken: string;
};
