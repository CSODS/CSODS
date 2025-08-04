import { Request, Response } from "express";
import { AUTH } from "@data";
import { getRefreshToken } from "./get-refresh-token";

const { refresh } = AUTH.TOKEN_CONFIG_RECORD;
const { cookieConfig: refreshCookie } = refresh;
/**
 * @public
 * @async
 * @function handleLogout
 * @description A controller for handling log out behavior by retrieving the `cookie` containing
 * the `refreshToken`, removing the `refreshToken` from the corresponding `User` in the database,
 * and clearing the `cookie` itself. Respons with status code `204` when log-out succeeds.
 * - If the cookie does not exist, immediately responds with a status code `204`.
 * - If the `cookie` exist but `User` is not found, immediately clear the `cookie`.
 * @param req
 * @param res
 * @returns
 */
export async function handleLogout(req: Request, res: Response) {
  const { requestLogContext: requestLogger, userDataService } = req;

  const refreshToken: string | null = getRefreshToken(req);
  if (!refreshToken) return;

  const foundUser = await userDataService.tryGetUser({
    type: "refresh",
    userId: 0,
  });

  if (foundUser) {
    requestLogger.log(
      "debug",
      `Deleting refresh token of user with id: ${foundUser.userId}.`
    );
    await userDataService.updateRefreshToken(foundUser.userId, null);
  }

  res.clearCookie(refreshCookie!.cookieName, refreshCookie!.clearCookie);
  return requestLogger.logStatus(204, "Logged out successfully.");
}
