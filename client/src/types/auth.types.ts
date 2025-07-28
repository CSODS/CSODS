export type TokenPayload = {
  userInfo: {
    email: string;
    username: string;
    studentName: string;
    studentNumber: string;
    userIconUrl: string;
    roles: string[];
  };
};

export type AuthSession = {
  tokenPayload: TokenPayload;
  accessToken: string;
};

export type AuthContextType = {
  auth: AuthSession | undefined;
  setAuth: React.Dispatch<React.SetStateAction<AuthSession | undefined>>;
};
