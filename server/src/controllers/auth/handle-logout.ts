import { Request, Response } from "express";
import { AUTH } from "@data";

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
  const cookies = req.cookies;
  if (!cookies?.[refreshCookie!.cookieName]) {
    res.status(204).json({ message: "Already logged out." });
    return;
  }

  const refreshToken: string = cookies[refreshCookie!.cookieName];

  const foundUser = await req.userDataService.getExistingUser({
    refreshToken: refreshToken,
  });

  if (foundUser)
    await req.userDataService.updateRefreshToken(foundUser.userId, null);

  res.clearCookie(refreshCookie!.cookieName, refreshCookie!.clearOptions);

  res.status(204).json({ message: "Logged out successfully." });
}
