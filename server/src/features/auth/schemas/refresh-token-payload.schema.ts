import z from "zod";

export type RefreshTokenPayload = z.infer<typeof refreshTokenPayload>;

export const refreshTokenPayload = z.object({
  userId: z.number(),
  sessionNumber: z.string(),
  isPersistentAuth: z.boolean().optional(),
});
