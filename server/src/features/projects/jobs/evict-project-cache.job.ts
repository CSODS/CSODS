import { JobsLogger } from "@/utils";
import { createProjectCacheEvictor } from "../services";

export async function evictProjectCache() {
  const projectCacheEvictor = createProjectCacheEvictor();

  JobsLogger.info("[CacheEviction] Evicting stale daily projects cache...");
  const evictedFiles = await projectCacheEvictor.evictStaleCache();
  JobsLogger.info(`[CacheEviction] Evicted ${evictedFiles} files.`);
}
