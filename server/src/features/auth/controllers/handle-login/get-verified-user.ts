import { Request } from "express";
import { authSchemas, authTypes, authUtils } from "../..";
import { AUTH_REGEX } from "@/data/constants/regex.constants";

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
 * @returns A `Promise` that resolves to a {@link UserViewModel} that contains details about
 * the verified `User` or `null` if validation or verification fails..
 */
export async function getVerifiedUser(
  req: Request<{}, {}, authSchemas.LoginOptions>
): Promise<authTypes.UserViewModel | null> {
  const { requestLogContext: requestLogger } = req;

  requestLogger.log("debug", "Validating login credentials.");

  const loginFields = req.body;

  const isEmail = AUTH_REGEX.EMAIL.test(loginFields.identifier);
  const loginMethod = isEmail ? "email" : "username";
  const loginValue = loginFields.identifier;

  const foundUser = await req.userDataService.tryGetUser({
    type: "login",
    login: loginFields,
  });

  if (!foundUser) {
    requestLogger.logStatus(401, {
      logMsg: `${loginMethod}: ${loginValue} doesn't exist.`,
      resMsg: "Incorrect email/username or password.",
    });
    return null;
  }

  const isUserVerified = await authUtils.verifyPassword(
    foundUser,
    loginFields.password
  );
  if (!isUserVerified) {
    requestLogger.logStatus(401, {
      logMsg: `Incorrect password for ${loginValue}.`,
      resMsg: "Incorrect email/username or password.",
    });
    return null;
  }

  return foundUser;
}
