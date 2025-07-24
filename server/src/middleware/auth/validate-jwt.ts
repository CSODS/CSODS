import dotenv from "dotenv";
import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TokenPayload } from "@viewmodels";
import { RouteLogger } from "@utils";

dotenv.config();

//  TODO: add handling for anonymous users (signed in as guest).
export function validateJWT(req: Request, res: Response, next: NextFunction) {
  const { method, originalUrl } = req;
  const logHeader = `[${method} ${originalUrl}]`;

  //  utility functions
  const log = (msg: string) => RouteLogger.debug(`${logHeader} ${msg}.`);
  const logStatus = (status: number, msg: string) => {
    log(msg);
    res.status(status).json({ message: `Status ${status}. ${msg}.` });
  };
  const logError = (status: number, msg: string, err: unknown) => {
    RouteLogger.error(`${logHeader} ${msg}.`, err);
    res.status(status).json({ message: `Status ${status}. ${msg}.` });
  };

  const authHeader = req.headers["authorization"];

  if (!authHeader?.startsWith("Bearer "))
    return logStatus(401, "Missing or malformed token.");

  const token = authHeader.split(" ")[1]; //  token is at index 1

  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

  if (!ACCESS_TOKEN_SECRET)
    return logStatus(500, "Server misconfiguration. Please try again later.");

  try {
    log("Validating JWT...");
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
    req.authPayload = payload;
    log("JWT validated");
    next();
  } catch (err) {
    return logError(
      403,
      "JWT verification failed. Invalid or expired token.",
      err
    );
  }
}
