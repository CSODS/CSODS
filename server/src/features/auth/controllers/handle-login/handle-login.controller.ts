import { Request, Response } from "express";
import { AUTH } from "@data";
import { LoginOptions } from "../../schemas";
import { createTokens, updateUserRefreshToken } from "../../utils";
import { getVerifiedUser } from "./get-verified-user";

const { refresh } = AUTH.TOKEN_CONFIG_RECORD;
const { cookieConfig: refreshCookie } = refresh;

/**
 * @public
 * @async
 * @function handleLogin
 * @description Controller for handling login.
 * - Verifies the user from the request body.
 * - Creates access and refresh tokens if user is verified.
 * - Updates user's refresh token in the database.
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

  const { accessToken, refreshToken } = await createTokens(req, verifiedUser);

  const updatedUserId = await updateUserRefreshToken(
    req,
    verifiedUser,
    refreshToken
  );

  if (!updatedUserId) return;

  //  cookie creation
  res.cookie(
    refreshCookie!.cookieName, //  cookie name (could be anything really)
    refreshToken,
    refreshCookie!.persistentCookie
  );
  res.json({ accessToken });

  req.requestLogContext.log("debug", "Login success.");
}
