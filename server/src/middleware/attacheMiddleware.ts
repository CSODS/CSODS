import { Request, Response, NextFunction } from "express";
import { createProjectCacheHandler, ProjectCacheHandler, createTagsCacheHandler, TagsCacheHandler, createProjectCachePageService, ProjectCachePageService } from "@services";

export async function attachProjectCacheHandler(req: Request, res: Response, next: NextFunction) {
    (req as any).projectCacheHandler = await createProjectCacheHandler();
    next();
};

export function attachTagsCacheHandler(req: Request, res: Response, next: NextFunction) {
    (req as any).tagsCacheHandler = createTagsCacheHandler();
    next();
}

export async function attachProjectCachePageService(req: Request, res: Response, next: NextFunction) {
    (req as any).projectCachePageService = await createProjectCachePageService();
    next();
}

declare global {
    namespace Express {
        interface Request {
            projectCacheHandler: ProjectCacheHandler,
            tagsCacheHandler: TagsCacheHandler,
            projectCachePageService: ProjectCachePageService
        }
    }
}