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
  const reqMethod = req.method;
  const originalUrl = req.originalUrl;
  const logHeader = `[${reqMethod} ${originalUrl}]`;

  //  usericon url is not required for now but will be implemented later.
  const user: RegisterSchema = req.body;

  //  validate existing email, username, student name, and student number.
  const existingUser = await req.userDataService.getExistingUser({
    user: user,
  });

  if (existingUser) {
    res.status(409).json({ message: "user already exists" });
    RouteLogger.debug(
      `${logHeader} User with id: ${existingUser.userId} already exists.`
    );
    return;
  }

  RouteLogger.debug(`${logHeader} Inserting new user.`);
  const inserted = await req.userDataService.insertUser(user);

  if (inserted) {
    RouteLogger.debug(`${logHeader} New user inserted.`);
    res.status(201).json({ success: "Registration success." });
  } else {
    RouteLogger.debug(`${logHeader} Failed inserting new user.`);
    res.status(409).json({ failed: "Failed creating new user." });
  }
}
