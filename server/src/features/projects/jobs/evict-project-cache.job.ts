import { JobsLogger } from "@/utils";
import { createProjectStoreEvictor } from "../services/eviction";

export async function evictProjectCache() {
  const projectCacheEvictor = createProjectStoreEvictor();

  JobsLogger.info("[CacheEviction] Evicting stale daily projects cache...");
  const evictedFiles = await projectCacheEvictor.evictStaleStore();
  JobsLogger.info(`[CacheEviction] Evicted ${evictedFiles} files.`);
}
