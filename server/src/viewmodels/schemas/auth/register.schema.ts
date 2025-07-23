import z from "zod";
import { REGEX } from "@data";

const AUTH_REGEX = REGEX.AUTH_REGEX;

export type RegisterSchema = z.infer<typeof registerSchema>;

export const registerSchema = z.object({
  email: z.email({
    error: (iss) =>
      iss.input === undefined ? "Email is required." : "Invalid email.",
  }),

  username: z
    .string({
      error: (iss) =>
        iss.input === undefined ? "Username is required." : "Invalid username.",
    })
    .regex(AUTH_REGEX.USERNAME, { error: "Invalid username." }),

  password: z
    .string({
      error: (iss) =>
        iss.input === undefined ? "Password is required." : "Invalid Password",
    })
    .regex(AUTH_REGEX.PASSWORD, {
      error: "Invalid password.",
    }),

  studentName: z
    .string()
    .regex(AUTH_REGEX.STUDENT_NAME, {
      error: "Invalid student name.",
    })
    .optional(),

  studentNumber: z
    .string()
    .regex(AUTH_REGEX.STUDENT_NUMBER, { error: "Invalid student number." })
    .optional(),

  userIconUrl: z.string().optional(),
});
