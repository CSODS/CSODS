import { Request, Response, NextFunction } from "express";
import { createUserSessionService } from "../services";

export async function attachUserSessionService(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.userSessionService = await createUserSessionService();
  next();
}
