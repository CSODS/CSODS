import { Request, Response } from "express";
import { AUTH } from "@data";
import { RouteLogHelper } from "@utils";
import { LoginSchema } from "../../schemas";
import { getVerifiedUser } from "./get-verified-user";
import { createTokens } from "./create-tokens";
import { updateUserRefreshToken } from "./update-user-refresh-token";

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
  req: Request<{}, {}, LoginSchema>,
  res: Response
) {
  const logger = new RouteLogHelper(req, res);

  const verifiedUser = await getVerifiedUser(req, res);
  if (!verifiedUser) return;

  const { accessToken, refreshToken } = await createTokens(
    req,
    res,
    verifiedUser
  );

  const updatedUserId = await updateUserRefreshToken(
    req,
    res,
    verifiedUser,
    refreshToken
  );

  if (!updatedUserId) return;

  //  cookie creation
  res.cookie(
    refreshCookie!.cookieName, //  cookie name (could be anything really)
    refreshToken,
    refreshCookie!.cookieOptions
  );
  res.json({ accessToken });

  logger.log("debug", "Login success.");
}
