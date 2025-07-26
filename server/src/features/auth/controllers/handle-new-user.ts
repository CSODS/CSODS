import { Request, Response } from "express";
import { RequestLogContext } from "@utils";
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
  const logger = new RequestLogContext(req, res);

  //  validate existing email, username, student name, and student number.
  const user = req.body;
  const existingUser = await req.userDataService.getExistingUser({
    user: user,
  });

  if (existingUser)
    return logger.logStatus(409, {
      logMsg: `User with id: ${existingUser.userId} already exists.`,
      resMsg: "User already exists.",
    });

  logger.log("debug", `Inserting new user.`);
  const inserted = await req.userDataService.insertUser(user);

  return inserted
    ? logger.logStatus(201, "User registration success.")
    : logger.logStatus(409, "User registration failed.");
}
