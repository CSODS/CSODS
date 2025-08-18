import { Request, Response, NextFunction } from "express";
import {
  createLegacyProjectCachePageService,
  createLegacyTagsCacheHandler,
} from "../services";

/**
 * @deprecated please use ProjectDataService
 * @param req
 * @param res
 * @param next
 */
export function attachTagsCacheHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.tagsCacheHandler = createLegacyTagsCacheHandler();
  next();
}

/**
 * @deprecated please use ProjectDataService
 * @param req
 * @param res
 * @param next
 */
export async function attachProjectCachePageService(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.projectCachePageService = await createLegacyProjectCachePageService();
  next();
}
