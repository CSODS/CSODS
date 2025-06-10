import { Request, Response, NextFunction } from "express";
import { createProjectCacheHandler, ProjectCacheHandler } from "../utils/cache/cacheHandler";

export async function attachProjectCacheHandler(req: Request, res: Response, next: NextFunction) {
    (req as any).projectCacheHandler = await createProjectCacheHandler();
    next();
};

declare global {
    namespace Express {
        interface Request {
            projectCacheHandler: ProjectCacheHandler
        }
    }
}