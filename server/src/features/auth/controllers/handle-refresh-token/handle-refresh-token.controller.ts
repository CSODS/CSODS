import { Request, Response } from "express";
import { AUTH } from "@data";
import { createTokens, updateUserRefreshToken } from "../../utils";
import { verifyRefreshToken } from "./verify-refresh-token";

/**
 * @public
 * @function handleRefreshToken
 * @description Controller for refreshing the access token with the refresh token.
 * - Retrieves the `refreshToken` from the request `cookies` and uses it to find the
 * corresponding `User` in the database.
 * - If the `User` is found and the `username` matches the one in the `payload`, refresh the
 * `accessToken`.
 * - If the `foundUser` and the `payload` do not match, respond with status code `403`.
 * - If an error occurs while verifying the `refreshToken` or creating a new `accessToken`,
 * respond with status code `403`.
 * @param req
 * @param res
 * @returns
 */
export async function handleRefreshToken(req: Request, res: Response) {
  //  cookie configuration
  const { refresh } = AUTH.TOKEN_CONFIG_RECORD;
  const { cookieName: refreshTokenCookie } = refresh.cookieConfig!;
  //  get refresh token
  const { cookies, requestLogContext: requestLogger, userDataService } = req;
  const refreshToken = cookies[refreshTokenCookie] as string;

  const foundUser = await userDataService.tryGetUser({
    type: "refresh",
    refreshToken: refreshToken,
  });

  //  evaluate jwt
  try {
    requestLogger.log("debug", "Attempting to refresh token");

    const payload = verifyRefreshToken(req, refreshToken, foundUser);
    if (!payload || !foundUser) return;

    const { accessToken, refreshToken: newRefreshToken } = await createTokens(
      req,
      foundUser,
      payload.isPersistentAuth
    );

    const updatedUserId = await updateUserRefreshToken(
      req,
      foundUser,
      newRefreshToken
    );

    if (!updatedUserId) return;

    const { refresh } = AUTH.TOKEN_CONFIG_RECORD;
    const { cookieConfig: refreshCookie } = refresh;

    if (!refreshCookie)
      throw new Error("Refresh token cookie configuration not set.");

    const { cookieName, persistentCookie, sessionCookie } = refreshCookie;

    res.cookie(
      cookieName, //  cookie name (could be anything really)
      newRefreshToken,
      payload.isPersistentAuth ? persistentCookie : sessionCookie
    );
    res.json({ accessToken });
  } catch (err) {
    requestLogger.logStatus(403, "Failed to refresh access token.", err);
  }
}
