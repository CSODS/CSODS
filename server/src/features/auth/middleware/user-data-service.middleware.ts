import { Request, Response, NextFunction } from "express";
import { createUserDataService } from "../services";

export async function attachUserDataService(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.userDataService = await createUserDataService();
  next();
}
