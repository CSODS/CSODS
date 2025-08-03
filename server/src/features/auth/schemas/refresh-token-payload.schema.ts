import z from "zod";

export type RefreshTokenPayload = z.infer<typeof refreshTokenPayload>;

export const refreshTokenPayload = z.object({
  userId: z.number(),
  isPersist: z.boolean().optional(),
});
