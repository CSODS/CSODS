import { NextFunction, Request, Response } from "express";
import { createProjectTagsDataService } from "../services";

export async function attachProjectTagsDataService(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.projectTagsDataService = await createProjectTagsDataService();
  next();
}
