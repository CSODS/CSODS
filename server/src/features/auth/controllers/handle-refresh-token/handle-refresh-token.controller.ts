import { Request, Response } from "express";
import { AUTH } from "@data";
import { createTokens, verifyRefreshToken } from "../../utils";
import { updateSession } from "./update-session";

/**
 * @public
 * @function handleRefreshToken
 * @description Controller for refreshing the access token with the refresh token.
 * - Retrieves the `refreshToken` from the request `cookies` and verifies it.
 * - Uses the `userId` inside the payload to find the corresponding `User` in the database.
 * - Creates a new token pair using the found `User`'s details and the previous refresh token's
 * payload.
 * - Updates the corresponding `UserSession`. The old token is used for verification, rotated
 * out, then replaced with the new token.
 * - The new token pair is sent out with the response.
 * - If an error occurs while verifying the `refreshToken` or creating a new token pair,
 * respond with status code `403`.
 * - If the session update fails, respond with status code `500`.
 * - All other errors are logged and triggers a status code `403` response.
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

  //  evaluate jwt
  try {
    requestLogger.log("debug", "Attempting to refresh token");

    const payload = verifyRefreshToken(req, refreshToken);

    if (!payload) return;

    const foundUser = await userDataService.tryGetUser({
      type: "refresh",
      userId: payload.userId,
    });

    if (!foundUser) return;

    const { accessToken, refreshToken: newRefreshToken } = await createTokens(
      req,
      foundUser,
      payload.sessionNumber,
      payload.isPersistentAuth
    );

    const updatedSessionId = await updateSession(req, {
      sessionNumber: payload.sessionNumber,
      userId: foundUser.userId,
      oldToken: refreshToken,
      newToken: newRefreshToken,
    });

    if (!updatedSessionId) return;

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
