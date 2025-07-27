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

/**
 * @deprecated Use {@link LoginOptions}
 */
export type LoginSchema = z.infer<typeof loginSchema>;
/**
 * @deprecated Please use {@link loginOptions}
 */
export const loginSchema = z.union([loginWithEmail, loginWithUsername]);

export const loginOptions = z.object({
  identifier: z.string({
    error: (iss) => {
      if (iss.code === "invalid_type") return "Identifier must be a string";
      if (!iss.input) return "Username or email is required.";
    },
  }),

  password: z.string({
    error: (iss) => {
      if (iss.code === "invalid_type") return "Password must be a string";
      if (!iss.input) return "Password is required.";
    },
  }),
});

export type LoginOptions = z.infer<typeof loginOptions>;
