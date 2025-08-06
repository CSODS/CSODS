import { Request, Response, NextFunction } from "express";
import {
  createLegacyProjectCachePageService,
  createTagsCacheHandler,
} from "../services";

export function attachTagsCacheHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.tagsCacheHandler = createTagsCacheHandler();
  next();
}

export async function attachProjectCachePageService(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.projectCachePageService = await createLegacyProjectCachePageService();
  next();
}
