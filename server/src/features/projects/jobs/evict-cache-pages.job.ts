import { JobsLogger } from "@/utils";
import { createProjectStoreEvictor } from "../services/eviction";

export async function evictCachePages() {
  const projectCacheEvictor = createProjectStoreEvictor();

  JobsLogger.info("[CacheEviction] Evicting stale pages from project caches.");
  const evictedPages = await projectCacheEvictor.evictPagesFromStores();
  JobsLogger.info(`[CacheEviction] Evicted ${evictedPages} pages.`);
}
