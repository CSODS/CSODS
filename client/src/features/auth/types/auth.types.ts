export type SignInForm = {
  identifier: string;
  password: string;
};

export type TokenPayload = {
  userInfo: {
    email: string;
    username: string;
    studentName: string;
    studentNumber: string;
    userIconUrl: string;
    roles: string;
  };
};
