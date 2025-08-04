import { Request, Response } from "express";
import { AUTH } from "@data";
import { getRefreshToken } from "./get-refresh-token";
import { verifyRefreshToken } from "../../utils";
import { endSession } from "./end-session";

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
  const { requestLogContext: requestLogger } = req;

  const refreshToken: string | null = getRefreshToken(req);
  if (!refreshToken) return;

  const payload = verifyRefreshToken(req, refreshToken);

  if (!payload) return clearCookie(res);

  const deletedSessionId = await endSession(req, payload.sessionNumber);

  if (!deletedSessionId) return clearCookie(res);

  clearCookie(res);
  return requestLogger.logStatus(204, "Logged out successfully.");
}

function clearCookie(res: Response) {
  if (!refreshCookie)
    throw new Error("Refresh token cookie configuration not set.");

  const { cookieName, clearCookie } = refreshCookie;

  res.clearCookie(cookieName, clearCookie);
}
