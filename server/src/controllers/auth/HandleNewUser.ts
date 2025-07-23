import { Request, Response } from "express";
import z from "zod";

/**
 * @public
 * @async
 * @function handlerNewUser
 * @description Handles validating of new user from POST request and storing to the database if
 * all validation checks are passed.
 * Executes the following actions:
 * - Retrieves the username, student name, email, password from {@link req.body}.
 * - Performs validation checks on the received data.
 * - Hashes the password.
 * - Stores to database.
 *
 * @param req
 * @param res
 * @returns
 */
export async function handleNewUser(
  req: Request<{}, {}, RegisterBody>,
  res: Response
) {
  //  data retrieval from request body.
  //  usericon url is not required for now but will be implemented later.
  const fields: RegisterBody = req.body;
  const validatedFields = RegisterSchema.safeParse(fields);

  if (!validatedFields.success) {
    const msg = z.prettifyError(validatedFields.error);
    res.status(404).json({ message: msg });
    return;
  }

  //  run a check through db to see if the new user's username, studentName, or email already exists.
  const isExistingUser = await req.userDataService.isUserExists(
    validatedFields.data
  );
  //  duplicate conflict.
  if (isExistingUser) {
    res.sendStatus(409).json({ message: "user already exists" });
    return;
  }

  try {
    console.log("inserting");
    await req.userDataService.insertUser(validatedFields.data);

    res.status(201).json({ success: "New user created." });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
}

type RegisterBody = z.infer<typeof RegisterSchema>;

const RegisterSchema = z.object({
  Email: z.email({
    error: (iss) =>
      iss.input === undefined ? "Email is required." : "Invalid email.",
  }),

  Username: z
    .string({
      error: (iss) =>
        iss.input === undefined ? "Username is required." : "Invalid username.",
    })
    .regex(/^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/, { error: "Invalid username." }),

  Password: z
    .string({
      error: (iss) =>
        iss.input === undefined ? "Password is required." : "Invalid Password",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/, {
      error: "Invalid password.",
    }),

  StudentName: z
    .string()
    .regex(/^[a-zA-Z]+(?:\s[a-zA-Z]+){0,9}$/, {
      error: "Invalid student name.",
    })
    .optional(),

  StudentNumber: z
    .string()
    .regex(/^[0-9]{3}-[0-9]{4}$/, { error: "Invalid student number." })
    .optional(),

  UserIconUrl: z.string().optional(),
});
