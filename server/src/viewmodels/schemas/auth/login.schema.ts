import z from "zod";
import { REGEX } from "@/data";

const AUTH_REGEX = REGEX.AUTH_REGEX;

const loginWithEmail = z.object({
  Email: z.email({
    error: (iss) =>
      iss.input === undefined ? "Email is required." : "Invalid email.",
  }),

  Username: z.undefined().optional(),

  Password: z
    .string({
      error: (iss) =>
        iss.input === undefined ? "Password is required." : "Invalid Password",
    })
    .regex(AUTH_REGEX.PASSWORD, {
      error: "Invalid password.",
    }),
});

const loginWithUsername = z.object({
  Email: z.undefined().optional(),

  Username: z
    .string({
      error: (iss) =>
        iss.input === undefined ? "Username is required." : "Invalid username.",
    })
    .regex(AUTH_REGEX.USERNAME, { error: "Invalid username." }),

  Password: z
    .string({
      error: (iss) =>
        iss.input === undefined ? "Password is required." : "Invalid Password",
    })
    .regex(AUTH_REGEX.PASSWORD, {
      error: "Invalid password.",
    }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const loginSchema = z.union([loginWithEmail, loginWithUsername]);
