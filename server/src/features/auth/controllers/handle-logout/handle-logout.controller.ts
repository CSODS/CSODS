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
 * the `refreshToken`, verifying the refresh token, then ending the `userSession` that corresponds
 * to the `sessionNumber` stored in the payload. Then clearing the `cookie` itself.
 * Responds with status code `204` when log-out succeeds.
 * - If the cookie does not exist, immediately responds with a status code `204`.
 * - If the `cookie` exists but the refresh token verification fails, respond with status code
 * `403`..
 * - If the session deletion fails, respond with status code `500`.
 * - The cookie is always cleared regardless of which step in the log out process fails.
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
