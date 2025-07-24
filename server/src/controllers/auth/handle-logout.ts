import { Request, Response } from "express";
import { AUTH } from "@data";
import { RouteLogger } from "@/utils";

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
  const { method, originalUrl, cookies, userDataService } = req;
  const logHeader = `[${method} ${originalUrl}]`;

  // utility functions
  const log = (msg: string) => RouteLogger.debug(`${logHeader} ${msg}.`);
  const loggedOut = (msg: string) => {
    log(msg);
    res.status(204).json({ message: `Status 204. ${msg}.` });
  };

  if (!cookies?.[refreshCookie!.cookieName])
    return loggedOut("Already logged out");

  const refreshToken: string = cookies[refreshCookie!.cookieName];

  const foundUser = await userDataService.getExistingUser({
    refreshToken: refreshToken,
  });

  if (foundUser) {
    log(`Deleting refresh token of user with id: ${foundUser.userId}`);
    await userDataService.updateRefreshToken(foundUser.userId, null);
  }

  res.clearCookie(refreshCookie!.cookieName, refreshCookie!.clearOptions);
  return loggedOut("Logged out successfully");
}
