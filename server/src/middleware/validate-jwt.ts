import dotenv from "dotenv";
import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TokenPayload } from "@viewmodels";

dotenv.config();

//  TODO: add handling for anonymous users (signed in as guest).
export function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  if (!authHeader?.startsWith("Bearer ")) {
    //  unauthorized. Auth header does not exist or is not properly constructed.
    res.status(401).json({ message: "Missing or malformed token." });
    return;
  }

  const token = authHeader.split(" ")[1]; //  token is at index 1

  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

  if (!ACCESS_TOKEN_SECRET) {
    res
      .status(500)
      .json({ message: "Server misconfiguration. Please try again later." });
    return;
  }

  try {
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
    req.authPayload = payload;
    next();
  } catch (err) {
    //  todo: add middleware routing here with winston logger.
    console.error("Jwt verification failed.", err);
    res.status(403).json({ message: "Invalid or expired token." });
    return;
  }
}
