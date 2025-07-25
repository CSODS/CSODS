import { Request, Response } from "express";
import { AUTH } from "@data";
import { RouteLogHelper } from "@utils";
import { LoginSchema, TokenPayload } from "../schemas";
import { UserViewModel } from "../types";
import { createJwt, createPayload, verifyPassword } from "../utils";

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

/**
 * @public
 * @async
 * @function getVerifiedUser
 * @description A helper for the {@link handleLogin} controller. Asynchronously handles
 * verifying the user from the provided credentials in the request body.
 * - Retrieves the `email` or `username`, and `password` from the request body.
 * - Attempts to read an existing `User` from the database with the provided login fields.
 * - If no `User` is found, respond with status code `401` and log the failed log-in attempt.
 * - If a `User` is found, verify if the provided password is correct.
 * - If the password is incorrect, respond with status code `401` and log the failed log-in
 * attempt.
 * - If the password is correct, return the {@link UserViewModel}.
 * @param req The request object.
 * @param res The response object.
 * @returns A `Promise` that resolves to a {@link UserViewModel} that contains details about
 * the verified `User` or `null` if validation or verification fails..
 */
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

/**
 * @public
 * @async
 * @function createTokens
 * @description A helper for the {@link handleLogin} controller. Asynchronously handles access
 * and refresh token creation.
 * - Retrieves a list of `role`s associated with the `User`.
 * - Creates a token payload containing the `verifiedUser` and the list of `role`s.
 * - Creates JWT `access` and `refresh` tokens containing the payload.
 * - Returns both tokens.
 * @param req
 * @param res
 * @param verifiedUser A {@link UserViewModel} used for retrieving the `User`'s `role`s and
 * creating the token `payload`.
 * @returns A `Promise` that resolves to a {@link Tokens} object containing the `accessToken`
 * and `refreshToken`.
 */
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

/**
 * @public
 * @async
 * @function updateUserRefreshToken
 * @description A helper for the {@link handleLogin} controller. Asynchronously handles updating
 * the refresh token of a `User` in the database.
 * - Utilizes the {@link userDataService} middleware to update the refresh token.
 * - If the update fails, log it and respond with status code `500`.
 * - Otherwise, simply return the updatedUserId.
 * @param req
 * @param res
 * @param verifiedUser The {@link UserViewModel} containing the userId needed for updating
 * the refresh token.
 * @param refreshToken The new refresh token to be stored to the database.
 * @returns A `Promise` that resolves to the updated `User`'s `id` or `null` if the update fails.
 */
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
