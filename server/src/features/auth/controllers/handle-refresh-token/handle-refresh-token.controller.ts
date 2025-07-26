import { AUTH } from "@data";
import { RequestLogContext } from "@utils";
import { Request, Response } from "express";
import { createJwt } from "../../utils";
import { verifyRefreshToken } from "./verify-refresh-token";

const { refresh } = AUTH.TOKEN_CONFIG_RECORD;
const { cookieName: REFRESH_TOKEN } = refresh.cookieConfig!;

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
  const logger = new RequestLogContext(req, res);

  const { cookies, userDataService } = req;
  const refreshToken = cookies[REFRESH_TOKEN] as string;

  const foundUser = await userDataService.getExistingUser({
    refreshToken: refreshToken,
  });

  //  evaluate jwt
  try {
    logger.log("debug", "Attempting to refresh token");

    const payload = verifyRefreshToken(req, res, refreshToken, foundUser);
    if (!payload) return;

    const accessToken = createJwt(payload, { tokenType: "access" });
    logger.log("debug", "Access token refreshed successfully");

    res.json({ accessToken });
  } catch (err) {
    logger.logStatus(403, "Failed to refresh access token.", err);
  }
}
