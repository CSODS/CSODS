import { Request, Response } from "express";
import { AUTH } from "@data";
import { LoginSchema, TokenPayload } from "@viewmodels";
import {
  createJwt,
  createPayload,
  RouteLogHelper,
  verifyPassword,
} from "@utils";

const { refresh } = AUTH.TOKEN_CONFIG_RECORD;
const { cookieConfig: refreshCookie } = refresh;

/**
 * @public
 * @async
 * @function handleLogin
 * @description Controller for handling login.
 * - Receives username, email, and password from the request body.
 * - Validates if the username and/or email fields exist.
 * - If they don't, respond with status 404. If they exist, check if the username and/or email exists in the database.
 * - If they don't, respond with status 401. If they exist in the database, validate the password with bcrypt.
 * - If the password doesn't match, responsd with status 401. If they match, return a success message.
 * @param req
 * @param res
 */
export async function handleLogin(
  req: Request<{}, {}, LoginSchema>,
  res: Response
) {
  //  utility
  const logger = new RouteLogHelper(req, res);
  const loginFail = (logMsg: string) => {
    logger.log("debug", `Login failed. ${logMsg}`);
    res.status(401).json({ message: `Incorrect email/username or password.` });
  };

  const loginFields = req.body;
  const loginMethod = loginFields.email ? "email" : "username";
  const loginValue = loginFields.email ?? loginFields.username;

  //  user verification
  logger.log("debug", "Validating login credentials.");
  const foundUser = await req.userDataService.getExistingUser({
    login: loginFields,
  });

  if (!foundUser)
    return loginFail(`${loginMethod}: ${loginValue} doesn't exist.`);

  const isUserVerified = await verifyPassword(foundUser, loginFields.password);
  if (!isUserVerified) return loginFail(`Incorrect password for ${loginValue}`);

  //  token creation
  const roles: string[] = await req.userDataService.getUserRoles(
    foundUser.userId
  );
  const payload: TokenPayload = createPayload(foundUser, roles);
  const accessToken = createJwt(payload, { tokenType: "access" });
  const refreshToken = createJwt(payload, { tokenType: "refresh" });

  const updatedUserId = await req.userDataService.updateRefreshToken(
    foundUser.userId,
    refreshToken
  );

  if (!updatedUserId)
    return logger.logStatus(
      500,
      "Failed updating refresh token. Please try again later."
    );

  //  cookie creation
  res.cookie(
    refreshCookie!.cookieName, //  cookie name (could be anything really)
    refreshToken,
    refreshCookie!.cookieOptions
  );

  logger.log("debug", "Login success.");
  res.json({ accessToken });
}
