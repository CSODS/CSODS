import { AUTH } from "@data";
import { createJwt, RouteLogger } from "@utils";
import { tokenPayload, TokenPayload } from "@viewmodels";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

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
  const { method, originalUrl, cookies, userDataService } = req;
  const logHeader = `[${method} ${originalUrl}]`;

  //  utility functions
  const log = (msg: string) => RouteLogger.debug(`${logHeader} ${msg}.`);
  const logFail = (msg: string) => {
    log(msg);
    res.status(403).json({ message: `403 Forbidden. ${msg}.` });
  };

  const refreshToken = cookies[REFRESH_TOKEN] as string;

  const foundUser = await userDataService.getExistingUser({
    refreshToken: refreshToken,
  });

  //  evaluate jwt
  try {
    log("Attempting to refresh token");

    const payload: TokenPayload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as TokenPayload;

    const verifiedPayload: TokenPayload = tokenPayload.parse(payload);

    const dbUsername = foundUser?.username;
    const payloadUsername = verifiedPayload.userInfo.username;

    if (dbUsername !== payloadUsername) return logFail("Invalid refresh token");

    const accessToken = createJwt(verifiedPayload, { tokenType: "access" });
    log("Access token refreshed successfully");

    res.json({ accessToken });
  } catch (err) {
    RouteLogger.error(`${logHeader} Failed to refresh access token.`, err);
    res.sendStatus(403);
  }
}
