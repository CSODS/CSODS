import { IEvictionOptions } from "@/services";
import { JobsLogger } from "@/utils";
import { createProjectCacheEvictor } from "../services";

export async function evictSearchCache() {
  const projectCacheEvictor = createProjectCacheEvictor();
  const evictionOptions: IEvictionOptions = {
    Strategy: "ttl+lfu",
    Duration: 1000 * 60 * 60, // 1 hour
    ViewThreshold: 10,
  };

  JobsLogger.info("Evicting stale projects search cache.");
  const evictedFiles = await projectCacheEvictor.evictStaleCache(
    evictionOptions,
    { excludeNoFilter: true }
  );
  JobsLogger.info(`Evicted ${evictedFiles} files.`);
}
