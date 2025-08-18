import { IEvictionOptions } from "@/services";
import { JobsLogger } from "@/utils";
import { createProjectStoreEvictor } from "../services";

export async function evictSearchCache() {
  const projectCacheEvictor = createProjectStoreEvictor();
  const evictionOptions: IEvictionOptions = {
    Strategy: "ttl+lfu",
    Duration: 1000 * 60 * 60, // 1 hour
    ViewThreshold: 10,
  };

  JobsLogger.info("[CacheEviction] Evicting stale projects search cache.");
  const evictedFiles = await projectCacheEvictor.evictStaleStore(
    evictionOptions,
    { excludeNoFilter: true }
  );
  JobsLogger.info(`[CacheEviction] Evicted ${evictedFiles} files.`);
}
