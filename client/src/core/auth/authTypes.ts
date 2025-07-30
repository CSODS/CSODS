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

export type SetAuthSession = React.Dispatch<
  React.SetStateAction<AuthSession | null>
>;

export type AuthContextType = {
  auth: AuthSession | null;
  setAuth: SetAuthSession;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
};
