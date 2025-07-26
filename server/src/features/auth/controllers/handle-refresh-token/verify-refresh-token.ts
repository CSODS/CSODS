import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { RequestLogContext } from "@utils";
import { authSchemas, authTypes } from "../..";

dotenv.config();

type UserViewModel = authTypes.UserViewModel;
type TokenPayload = authSchemas.TokenPayload;
const tokenPayload = authSchemas.tokenPayload;

/**
 * @public
 * @function verifyRefreshToken
 * @description Helper function for {@link handleRefreshToken} controller. Verifies the
 * refresh token and compares the payload to the `user`. If the token verification fails
 * or the `user` does not match the `payload`, responds with status code `403`.
 * @param req
 * @param res
 * @param refreshToken
 * @param user
 * @returns
 */
export function verifyRefreshToken(
  req: Request,
  res: Response,
  refreshToken: string,
  user: UserViewModel | null
): TokenPayload | null {
  const logger = new RequestLogContext(req, res);

  let payload;
  try {
    payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
  } catch (err) {
    logger.logStatus(403, "Invalid or expired refresh token.", err);
    return null;
  }

  const verifiedPayload: TokenPayload = tokenPayload.parse(payload);

  const dbUsername = user?.username;
  const payloadUsername = verifiedPayload.userInfo.username;

  if (dbUsername !== payloadUsername) {
    logger.logStatus(403, "Refresh token mismatch.");
    return null;
  }

  return verifiedPayload;
}
