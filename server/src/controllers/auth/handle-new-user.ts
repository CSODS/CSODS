import { Request, Response } from "express";
import { RegisterSchema } from "@viewmodels";

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
  //  usericon url is not required for now but will be implemented later.
  const user = req.body;

  //  validate existing email, username, student name, and student number.
  const existingUser = await req.userDataService.getExistingUser({
    user: user,
  });

  if (existingUser) {
    res.status(409).json({ message: "user already exists" });
    return;
  }

  try {
    const inserted = await req.userDataService.insertUser(user);
    inserted
      ? res.status(201).json({ success: "New user created." })
      : res.status(409).json({ failed: "Failed creating new user." });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
}
