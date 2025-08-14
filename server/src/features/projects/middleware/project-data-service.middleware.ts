import { Request, Response, NextFunction } from "express";
import { createProjectDataService } from "../services";

export async function attachProjectDataService(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.projectDataService = await createProjectDataService();
  next();
}
