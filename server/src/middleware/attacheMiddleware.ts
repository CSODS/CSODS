import { Request, Response, NextFunction } from "express";
import { createProjectCacheHandler, ProjectCacheHandler, createTagsCacheHandler, TagsCacheHandler } from "@services";

export async function attachProjectCacheHandler(req: Request, res: Response, next: NextFunction) {
    (req as any).projectCacheHandler = await createProjectCacheHandler();
    next();
};

export function attachTagsCacheHandler(req: Request, res: Response, next: NextFunction) {
    (req as any).tagsCacheHandler = createTagsCacheHandler();
    next();
}

declare global {
    namespace Express {
        interface Request {
            projectCacheHandler: ProjectCacheHandler,
            tagsCacheHandler: TagsCacheHandler
        }
    }
}