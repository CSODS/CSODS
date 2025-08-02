import dotenv from "dotenv";
import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { RequestLogContext } from "@utils";
import { AccessTokenPayload } from "../schemas";

dotenv.config();

//  TODO: add handling for anonymous users (signed in as guest).
export function validateJWT(req: Request, res: Response, next: NextFunction) {
  const { headers, requestLogContext: requestLogger } = req;

  const authHeader = headers["authorization"];

  if (!authHeader?.startsWith("Bearer "))
    return requestLogger.logStatus(401, "Missing or malformed token.");

  const token = authHeader.split(" ")[1]; //  token is at index 1

  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  if (!ACCESS_TOKEN_SECRET)
    return requestLogger.logStatus(
      500,
      "Server misconfiguration. Please try again later."
    );

  try {
    requestLogger.log("debug", "Validating access JWT...");
    const payload = jwt.verify(
      token,
      ACCESS_TOKEN_SECRET
    ) as AccessTokenPayload;
    req.authPayload = payload;
    requestLogger.log("debug", "Access JWT validated.");
    next();
  } catch (err) {
    return requestLogger.logStatus(
      403,
      "Access JWT verification failed. Invalid or expired token.",
      err
    );
  }
}
