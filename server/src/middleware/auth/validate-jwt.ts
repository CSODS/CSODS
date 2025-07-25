import dotenv from "dotenv";
import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TokenPayload } from "@viewmodels";
import { RouteLogHelper } from "@utils";

dotenv.config();

//  TODO: add handling for anonymous users (signed in as guest).
export function validateJWT(req: Request, res: Response, next: NextFunction) {
  const logger = new RouteLogHelper(req, res);

  const authHeader = req.headers["authorization"];

  if (!authHeader?.startsWith("Bearer "))
    return logger.logStatus(401, "Missing or malformed token.");

  const token = authHeader.split(" ")[1]; //  token is at index 1

  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  if (!ACCESS_TOKEN_SECRET)
    return logger.logStatus(
      500,
      "Server misconfiguration. Please try again later."
    );

  try {
    logger.log("debug", "Validating JWT...");
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
    req.authPayload = payload;
    logger.log("debug", "JWT validated.");
    next();
  } catch (err) {
    return logger.logStatus(
      403,
      "JWT verification failed. Invalid or expired token.",
      err
    );
  }
}
