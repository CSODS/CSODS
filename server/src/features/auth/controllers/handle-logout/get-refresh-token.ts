import { AUTH } from "@data";
import { Request } from "express";

const tokenConfig = AUTH.TOKEN_CONFIG_RECORD.refresh;
const cookieConfig = tokenConfig.cookieConfig!;
const REFRESH_TOKEN = cookieConfig.cookieName;

/**
 * @public
 * @function getRefreshToken
 * @description Helper function for the {@link handleLogout} controller. Retrieves the
 * refresh token from the cookies. If the cookies or refresh token don't exist, responds with
 * status code `204`.
 * @param req
 * @param res
 * @returns
 */
export function getRefreshToken(req: Request): string | null {
  const { cookies } = req;

  if (!cookies?.[REFRESH_TOKEN]) {
    req.requestLogContext.logStatus(204, "Already logged out.");
    return null;
  }

  const refreshToken: string = cookies[REFRESH_TOKEN];

  return refreshToken;
}
