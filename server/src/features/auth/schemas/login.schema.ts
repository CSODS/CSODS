import z from "zod";

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

  isPersistentAuth: z.boolean().optional(),
});

export type LoginOptions = z.infer<typeof loginOptions>;
