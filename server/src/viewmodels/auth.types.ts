import z from "zod";

export type TokenPayload = z.infer<typeof tokenPayload>;

export const tokenPayload = z.object({
  userInfo: z.object({
    email: z.string(),
    username: z.string(),
    studentName: z.string().nullish().optional(),
    studentNumber: z.string().nullish().optional(),
    userIconUrl: z.string().nullish().default("").optional(),
    roles: z.array(z.string()),
  }),
});
