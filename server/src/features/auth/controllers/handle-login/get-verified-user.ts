import { Request, Response } from "express";
import { RouteLogHelper } from "@utils";
import { authTypes, authUtils } from "../..";

type UserViewModel = authTypes.UserViewModel;
const { verifyPassword } = authUtils;

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
export async function getVerifiedUser(
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
