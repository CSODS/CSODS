import cron from 'node-cron';
import { createProjectCacheEvictor, ProjectCacheEvictor } from '../cacheEviction/projectsCache/projectCacheEvictor.js';
import { IEvictionOptions } from '../cacheEviction/baseCacheEvictor.js';
import dotenv from 'dotenv';
dotenv.config();

export function createEvictionJobService(): EvictionJobService {

    const cacheEvictionOptions: IEvictionOptions = {
        Strategy: 'ttl',
        Duration: 1000 * 60 * 60 * 24 * 1,
        Granularity: 1000 * 60 * 60 * 24,
        ViewThreshold: 5
    };

    const pageEvictionOptions: IEvictionOptions = {
        Strategy: 'ttl+lfu',
        Duration: 1000 * 60 * 60 * 3,
        Granularity: 1000 * 60 * 60,
        ViewThreshold: 5
    };

    const projectCacheEvictor = createProjectCacheEvictor(
        cacheEvictionOptions,
        pageEvictionOptions
    );
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
    private readonly _projectCacheEvictor: ProjectCacheEvictor;
    /**
     * @constructor
     * @param {ProjectCacheEvictor} projectCacheEvictor - The eviction handler used to perform cache cleanup logic.
     */
    public constructor(
        projectCacheEvictor: ProjectCacheEvictor) {
        this._projectCacheEvictor = projectCacheEvictor;
    }

    /**
     * @public
     * @description
     * Schedules a cron job to evict stale project cache **files** once every day at midnight.
     * 
     * Cron Expression: (Every day at 00:00:00)
     */
    public scheduleProjectCacheEviction() {
        cron.schedule('0 0 0 * * *', async () => {
            await this.evictProjectCache();
        });
    }
    /**
     * @public
     * @description
     * Immediately runs the logic to evict stale project cache files based on the configured eviction strategy.
     * 
     * Logs the total number of files evicted.
     */
    public async evictProjectCache(): Promise<void> {
        console.log('[Cron] Evicting projects cache.');
        const evictedFiles = await this._projectCacheEvictor.evictStaleCache();
        console.log(`[Cron] Evicted ${evictedFiles} files`);
    }
    /**
     * @public
     * @description
     * Schedules a cron job to evict stale **pages** within the cache files every 3 hours.
     * 
     * Cron Expression: (Every 3rd hour, on the hour)
     */
    public scheduleCachePageEviction() {
        cron.schedule('0 0 */3 * * *', async () => {
            await this.evictCachePages();
        });
    }
    /**
     * @public
     * @description
     * Immediately runs the logic to evict stale cache pages within project cache files
     * using the currently active eviction strategy.
     * 
     * Logs the total number of pages evicted.
     */
    public async evictCachePages() {
        console.log('Evicting cache pages.');
        const evictedPages = await this._projectCacheEvictor.evictPagesFromCaches();
        console.log(`[Cron] Evicted a total of ${evictedPages} pages`);
    }
}