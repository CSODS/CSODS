var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import cron from 'node-cron';
import { createProjectCacheEvictor } from '../cacheEviction/projectsCache/projectCacheEvictor.js';
import dotenv from 'dotenv';
dotenv.config();
export function createEvictionJobService() {
    const cacheEvictionOptions = {
        Strategy: 'ttl',
        Duration: 1000 * 60 * 60 * 24 * 1,
        Granularity: 1000 * 60 * 60 * 24,
        ViewThreshold: 5
    };
    const pageEvictionOptions = {
        Strategy: 'ttl+lfu',
        Duration: 1000 * 60 * 60 * 3,
        Granularity: 1000 * 60 * 60,
        ViewThreshold: 5
    };
    const projectCacheEvictor = createProjectCacheEvictor(cacheEvictionOptions, pageEvictionOptions);
    const evictionJobInstance = new EvictionJobService(projectCacheEvictor);
    return evictionJobInstance;
}
/**
 * @class EvictionJobService
 * @description
 * Schedules and manages recurring cache eviction tasks for the project cache system.
 *
 * This service uses cron jobs to periodically trigger:
 * - Whole-file eviction of stale project cache files (daily at midnight).
 * - Page-level eviction within existing project cache files (every 3 hours).
 */
export class EvictionJobService {
    /**
     * @constructor
     * @param {ProjectCacheEvictor} projectCacheEvictor - The eviction handler used to perform cache cleanup logic.
     */
    constructor(projectCacheEvictor) {
        this._projectCacheEvictor = projectCacheEvictor;
    }
    /**
     * @public
     * @description
     * Schedules a cron job to evict stale project cache **files** once every day at midnight.
     *
     * Cron Expression: (Every day at 00:00:00)
     */
    scheduleProjectCacheEviction() {
        cron.schedule('0 0 0 * * *', () => __awaiter(this, void 0, void 0, function* () {
            yield this.evictProjectCache();
        }));
    }
    /**
     * @public
     * @description
     * Immediately runs the logic to evict stale project cache files based on the configured eviction strategy.
     *
     * Logs the total number of files evicted.
     */
    evictProjectCache() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Cron] Evicting projects cache.');
            const evictedFiles = yield this._projectCacheEvictor.evictStaleCache();
            console.log(`[Cron] Evicted ${evictedFiles} files`);
        });
    }
    /**
     * @public
     * @description
     * Schedules a cron job to evict stale **pages** within the cache files every 3 hours.
     *
     * Cron Expression: (Every 3rd hour, on the hour)
     */
    scheduleCachePageEviction() {
        cron.schedule('0 0 */3 * * *', () => __awaiter(this, void 0, void 0, function* () {
            yield this.evictCachePages();
        }));
    }
    /**
     * @public
     * @description
     * Immediately runs the logic to evict stale cache pages within project cache files
     * using the currently active eviction strategy.
     *
     * Logs the total number of pages evicted.
     */
    evictCachePages() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Evicting cache pages.');
            const evictedPages = yield this._projectCacheEvictor.evictPagesFromCaches();
            console.log(`[Cron] Evicted a total of ${evictedPages} pages`);
        });
    }
}
