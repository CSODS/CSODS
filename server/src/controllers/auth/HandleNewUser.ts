import { Request, Response } from "express";
import z from "zod";

/**
 * @public
 * @async
 * @function handlerNewUser
 * @description Handles validating of new user from POST request and storing to the database if
 * all validation checks are passed.
 * Executes the following actions:
 * - Retrieves the fields from the request body following the {@link RegisterBody}.
 * - Validates the fields against the {@link RegisterSchema}
 * - Validates if a `user` already exists in the database.
 * - Stores to database if all validity checks are passed.
 *
 * @param req
 * @param res
 * @returns
 */
export async function handleNewUser(
  req: Request<{}, {}, RegisterBody>,
  res: Response
) {
  //  usericon url is not required for now but will be implemented later.
  const fields: RegisterBody = req.body;
  const validatedFields = RegisterSchema.safeParse(fields);

  if (!validatedFields.success) {
    const msg = z.prettifyError(validatedFields.error);
    res.status(404).json({ message: msg });
    return;
  }

  //  validate existing email, username, student name, and student number.
  const isExistingUser = await req.userDataService.isUserExists(
    validatedFields.data
  );

  if (isExistingUser) {
    res.sendStatus(409).json({ message: "user already exists" });
    return;
  }

  try {
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
