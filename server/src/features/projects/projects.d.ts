import { ProjectCachePageService, TagsCacheHandler } from "@/services";

declare global {
  namespace Express {
    interface Request {
      tagsCacheHandler: TagsCacheHandler;
      projectCachePageService: ProjectCachePageService;
    }
  }
}
