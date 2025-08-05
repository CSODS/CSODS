import { Request, Response } from "express";
import { AUTH } from "@data";
import { LoginOptions } from "../../schemas";
import { createTokens } from "../../utils";
import { getVerifiedUser } from "./get-verified-user";
import { startNewSession } from "./start-new-session";

/**
 * @public
 * @async
 * @function handleLogin
 * @description Controller for handling login.
 * - Verifies the user from the request body.
 * - Creates access and refresh tokens if user is verified.
 * - Creates a new session for the user.
 * - Returns a JSON containing the access token and a cookie containing the refresh token.
 * TODO: IMPLEMENT BETTER ERROR HANDLING
 * @param req
 * @param res
 */
export async function handleLogin(
  req: Request<{}, {}, LoginOptions>,
  res: Response
) {
  const verifiedUser = await getVerifiedUser(req);
  if (!verifiedUser) return;

  const sessionNumber = req.userSessionService.generateSessionNumber(
    verifiedUser.userId
  );

  const { isPersistentAuth } = req.body;
  const { accessToken, refreshToken } = await createTokens(
    req,
    verifiedUser,
    sessionNumber,
    isPersistentAuth
  );

  const newSessionId = await startNewSession(
    req,
    sessionNumber,
    verifiedUser,
    refreshToken,
    {
      isPersistentAuth,
    }
  );

  if (!newSessionId) return;

  const { refresh } = AUTH.TOKEN_CONFIG_RECORD;
  const { cookieConfig: refreshCookie } = refresh;

  if (!refreshCookie)
    throw new Error("Refresh token cookie configuration not set.");

  const { cookieName, persistentCookie, sessionCookie } = refreshCookie;

  //  cookie creation
  res.cookie(
    cookieName, //  cookie name (could be anything really)
    refreshToken,
    isPersistentAuth ? persistentCookie : sessionCookie
  );
  res.json({ accessToken });

  req.requestLogContext.log("debug", "Login success.");
}
