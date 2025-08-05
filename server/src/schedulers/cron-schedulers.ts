import cron from "node-cron";
import { authJobs } from "@/features";

cron.schedule("0 0 0 * * *", authJobs.cleanUpIdleSessions);

cron.schedule("0 0 0 * * *", authJobs.cleanUpExpiredSessions);
