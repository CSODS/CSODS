import cron from "node-cron";
import { authJobs, projectsJobs } from "@/features";

//  every day at the 00:25
cron.schedule("0 25 0 * * *", authJobs.cleanUpIdleSessions);

//  every day at the 00:30
cron.schedule("0 30 0 * * *", authJobs.cleanUpExpiredSessions);

//  every hour at the 5th minute
cron.schedule("0 5 * * * *", projectsJobs.decayCachePageViews);

// every day at the 00:10
cron.schedule("0 10 0 * * *", projectsJobs.evictProjectCache);

// every hour at the 15th minute
cron.schedule("0 15 * * * *", projectsJobs.evictSearchCache);

// every hour at the 20th minute
cron.schedule("0 20 * * * *", projectsJobs.evictCachePages);
