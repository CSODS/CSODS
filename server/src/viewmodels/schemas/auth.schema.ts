import z from "zod";

export type RegisterSchema = z.infer<typeof registerSchema>;

export const registerSchema = z.object({
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
