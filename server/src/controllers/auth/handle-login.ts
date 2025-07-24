import { Request, Response } from "express";
import { AUTH } from "@data";
import { LoginSchema, TokenPayload } from "@viewmodels";
import { createJwt, createPayload, RouteLogger, verifyPassword } from "@utils";

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
  const { method, originalUrl, body: loginFields } = req;
  const logHeader = `[${method} ${originalUrl}]`;

  const log = (msg: string) => RouteLogger.debug(`${logHeader} ${msg}`);
  const loginFail = (reason: string) => {
    log(`Login failed: ${reason}`);
    res.status(401).json({ message: `Incorrect ${loginMethod} or password.` });
  };

  const { email, username } = loginFields;
  const loginMethod = email ? "email" : username ? "username" : "";

  log("Validating login credentials.");
  const foundUser = await req.userDataService.getExistingUser({
    login: loginFields,
  });

  if (!foundUser) return loginFail(`${loginMethod} doesn't exist.`);

  const isUserVerified = await verifyPassword(foundUser, loginFields.password);
  if (!isUserVerified)
    return loginFail(`Incorrect password for ${email ?? username}`);

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

  if (!updatedUserId) {
    RouteLogger.error(`${logHeader} Failed updating refresh token.`);
    res.status(500).json({
      message: "Failed updating refresh token. Please try again later.", //  database update operation failed.
    });
    return;
  }

  res.cookie(
    refreshCookie!.cookieName, //  cookie name (could be anything really)
    refreshToken,
    refreshCookie!.cookieOptions
  );

  log("Login success.");
  res.json({ accessToken });
}
