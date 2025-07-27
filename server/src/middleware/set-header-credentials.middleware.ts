import { Request, Response, NextFunction } from "express";
import { ENV } from "@/data";

export function setHeaderCredentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const whitelist = ENV.getCorsWhitelist();
  const origin = req.headers.origin;
  if (origin && whitelist.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", origin);
  }
  next();
}
