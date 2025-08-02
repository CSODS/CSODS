import { Request } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { authSchemas, authTypes } from "../..";

dotenv.config();

/**
 * @public
 * @function verifyRefreshToken
 * @description Helper function for {@link handleRefreshToken} controller. Verifies the
 * refresh token and compares the payload to the `user`. If the token verification fails
 * or the `user` does not match the `payload`, responds with status code `403`.
 * @param req
 * @param refreshToken
 * @param user
 * @returns
 */
export function verifyRefreshToken(
  req: Request,
  refreshToken: string,
  user: authTypes.UserViewModel | null
): authSchemas.RefreshTokenPayload | null {
  const { requestLogContext: requestLogger } = req;

  let payload;
  try {
    payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
  } catch (err) {
    requestLogger.logStatus(403, "Invalid or expired refresh token.", err);
    return null;
  }

  const verifiedPayload = authSchemas.refreshTokenPayload.parse(payload);

  const dbUserId = user?.userId;
  const payloadUserId = verifiedPayload.userId;

  if (dbUserId !== payloadUserId) {
    requestLogger.logStatus(403, "Refresh token mismatch.");
    return null;
  }

  return verifiedPayload;
}
