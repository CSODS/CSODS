import { Request, Response } from "express";
import { AUTH } from "@data";
import { LoginSchema, TokenPayload, UserViewModel } from "@viewmodels";
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

  logger.log("debug", "Login success.");
  res.json({ accessToken });
}

async function getVerifiedUser(
  req: Request,
  res: Response
): Promise<UserViewModel | null> {
  const logger = new RouteLogHelper(req, res);

  logger.log("debug", "Validating login credentials.");

  const loginFields = req.body;
  const loginMethod = loginFields.email ? "email" : "username";
  const loginValue = loginFields.email ?? loginFields.username;

  const foundUser = await req.userDataService.getExistingUser({
    login: loginFields,
  });
  if (!foundUser) {
    logger.logStatus(401, {
      logMsg: `${loginMethod}: ${loginValue} doesn't exist.`,
      resMsg: "Incorrect email/username or password.",
    });
    return null;
  }

  const isUserVerified = await verifyPassword(foundUser, loginFields.password);
  if (!isUserVerified) {
    logger.logStatus(401, {
      logMsg: `Incorrect password for ${loginValue}.`,
      resMsg: "Incorrect email/username or password.",
    });
    return null;
  }

  return foundUser;
}

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

async function createTokens(
  req: Request,
  res: Response,
  verifiedUser: UserViewModel
): Promise<Tokens> {
  const logger = new RouteLogHelper(req, res);

  logger.log("debug", "Creating tokens.");

  const roles: string[] = await req.userDataService.getUserRoles(
    verifiedUser.userId
  );
  const payload: TokenPayload = createPayload(verifiedUser, roles);
  const accessToken = createJwt(payload, { tokenType: "access" });
  const refreshToken = createJwt(payload, { tokenType: "refresh" });

  return { accessToken, refreshToken };
}

async function updateUserRefreshToken(
  req: Request,
  res: Response,
  verifiedUser: UserViewModel,
  refreshToken: string
): Promise<number | null> {
  const logger = new RouteLogHelper(req, res);

  const updatedUserId = await req.userDataService.updateRefreshToken(
    verifiedUser.userId,
    refreshToken
  );

  if (!updatedUserId)
    logger.logStatus(
      500,
      "Failed updating refresh token. Please try again later."
    );

  return updatedUserId;
}
