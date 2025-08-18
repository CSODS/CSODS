import { JobsLogger } from "@/utils";
import { createLegacyProjectCacheEvictor } from "../services";

export async function evictProjectCache() {
  const projectCacheEvictor = createLegacyProjectCacheEvictor();

  JobsLogger.info("[CacheEviction] Evicting stale daily projects cache...");
  const evictedFiles = await projectCacheEvictor.evictStaleCache();
  JobsLogger.info(`[CacheEviction] Evicted ${evictedFiles} files.`);
}
