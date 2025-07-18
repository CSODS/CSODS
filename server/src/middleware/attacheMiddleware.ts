import { Request, Response, NextFunction } from "express";
import { createTagsCacheHandler, TagsCacheHandler, createProjectCachePageService, ProjectCachePageService } from "@services";


export function attachTagsCacheHandler(req: Request, res: Response, next: NextFunction) {
    req.tagsCacheHandler = createTagsCacheHandler();
    next();
}

export async function attachProjectCachePageService(req: Request, res: Response, next: NextFunction) {
    req.projectCachePageService = await createProjectCachePageService();
    next();
}

declare global {
    namespace Express {
        interface Request {
            tagsCacheHandler: TagsCacheHandler,
            projectCachePageService: ProjectCachePageService
        }
    }
}