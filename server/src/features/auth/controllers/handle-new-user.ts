import { Request, Response } from "express";
import { RegisterSchema } from "../schemas";

/**
 * @public
 * @async
 * @function handlerNewUser
 * @description Handles validating of new user from POST request and storing to the database if
 * all validation checks are passed.
 * Executes the following actions:
 * - Validates if a `user` already exists in the database.
 * - Stores new user to database if validity checks are passed.
 *
 * @param req
 * @param res
 * @returns
 */
export async function handleNewUser(
  req: Request<{}, {}, RegisterSchema>,
  res: Response
) {
  const { requestLogContext: requestLogger } = req;

  //  validate existing email, username, student name, and student number.
  const user = req.body;
  const existingUser = await req.userDataService.tryGetUser({
    type: "user",
    user: user,
  });

  if (existingUser)
    return requestLogger.logStatus(409, {
      logMsg: `User with id: ${existingUser.userId} already exists.`,
      resMsg: "User already exists.",
    });

  requestLogger.log("debug", `Inserting new user.`);
  const inserted = await req.userDataService.insertUser(user);

  return inserted
    ? requestLogger.logStatus(201, "User registration success.")
    : requestLogger.logStatus(409, "User registration failed.");
}
