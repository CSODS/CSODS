export type AuthAttemptResult = {
  accessToken: string | null;
  errDetails?: {
    message: string;
    statusCode: string | number;
  };
};
