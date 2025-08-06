import { JobsLogger } from "@/utils";
import { createProjectCacheEvictor } from "../services";

export async function evictCachePages() {
  const projectCacheEvictor = createProjectCacheEvictor();

  JobsLogger.info("[CacheEviction] Evicting stale pages from project caches.");
  const evictedPages = await projectCacheEvictor.evictPagesFromCaches();
  JobsLogger.info(`[CacheEviction] Evicted ${evictedPages} pages.`);
}
