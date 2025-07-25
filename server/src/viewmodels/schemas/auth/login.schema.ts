import z from "zod";
import { REGEX } from "@/data";

const AUTH_REGEX = REGEX.AUTH_REGEX;

const loginWithEmail = z.object({
  email: z.email({
    error: (iss) =>
      iss.input === undefined ? "Email is required." : "Invalid email.",
  }),

  username: z.undefined().optional(),

  password: z
    .string({
      error: (iss) =>
        iss.input === undefined ? "Password is required." : "Invalid Password",
    })
    .regex(AUTH_REGEX.PASSWORD, {
      error: "Invalid password.",
    }),
});

const loginWithUsername = z.object({
  email: z.undefined().optional(),

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
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const loginSchema = z.union([loginWithEmail, loginWithUsername]);
