import cron from "node-cron";
import { authJobs, projectsJobs } from "@/features";

const viewsDecayJobService = projectsJobs.createViewsDecayJobService();
const evictionJobService = projectsJobs.createEvictionJobService();

cron.schedule("0 0 0 * * *", authJobs.cleanUpIdleSessions);

cron.schedule("0 5 0 * * *", authJobs.cleanUpExpiredSessions);

// every hour at 0 minutes
viewsDecayJobService.scheduleViewsDecay();

// every day
evictionJobService.scheduleProjectCacheEviction();

// every hour at 3 minutes
evictionJobService.scheduleSearchCacheEviction();

// every hour at 5 minutes
evictionJobService.scheduleCachePageEviction();
