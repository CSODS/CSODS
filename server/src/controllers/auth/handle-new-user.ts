import { Request, Response } from "express";
import { RegisterSchema } from "@viewmodels";
import { RouteLogger } from "@/utils";

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
  const { method, originalUrl, body: user } = req;
  const logHeader = `[${method} ${originalUrl}]`;

  //  utility functions
  const log = (msg: string) => RouteLogger.debug(`${logHeader} ${msg}.`);
  const logSuccess = (logMsg: string, resMsg: string) => {
    log(logMsg);
    res.status(201).json({ success: resMsg });
  };
  const logFail = (logMsg: string, resMsg: string) => {
    log(logMsg);
    res.status(409).json({ failed: resMsg });
  };

  //  validate existing email, username, student name, and student number.
  const existingUser = await req.userDataService.getExistingUser({
    user: user,
  });

  if (existingUser)
    return logFail(
      "User already exists",
      `User with id: ${existingUser.userId} already exists`
    );

  log(`Inserting new user.`);
  const inserted = await req.userDataService.insertUser(user);

  return inserted
    ? logSuccess("New user inserted", "Registration success")
    : logFail("Failed inserting new user", "Failed registration.");
}
