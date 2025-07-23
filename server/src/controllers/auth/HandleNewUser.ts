import { Request, Response } from "express";
import z from "zod";
import { registerSchema, RegisterSchema } from "@viewmodels";

/**
 * @public
 * @async
 * @function handlerNewUser
 * @description Handles validating of new user from POST request and storing to the database if
 * all validation checks are passed.
 * Executes the following actions:
 * - Retrieves the fields from the request body following the {@link RegisterSchema}.
 * - Validates the fields against the {@link registerSchema}
 * - Validates if a `user` already exists in the database.
 * - Stores to database if all validity checks are passed.
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
  const fields: RegisterSchema = req.body;
  const validationResult = registerSchema.safeParse(fields);

  if (!validationResult.success) {
    const msg = z.prettifyError(validationResult.error);
    res.status(404).json({ message: msg });
    return;
  }

  const validatedUser = validationResult.data;

  //  validate existing email, username, student name, and student number.
  const isExistingUser = await req.userDataService.isUserExists(validatedUser);

  if (isExistingUser) {
    res.sendStatus(409).json({ message: "user already exists" });
    return;
  }

  try {
    await req.userDataService.insertUser(validatedUser);

    res.status(201).json({ success: "New user created." });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
}
