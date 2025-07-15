import { IProjectCache } from "../../viewmodels/cache/cacheInterfaces";
import { ViewsDecayService } from "./viewsDecayService";

/**
 * @class ProjectsViewDecayService
 * @extends ViewsDecayService<IProjectCache>
 *
 * @description
 * A specialized service for decaying view counts of project cache pages.
 * 
 * This class adds a new method {@link decayCachePagesViews} which overrides
 * the default decay behavior provided by {@link ViewsDecayService.defaultDecayFunc}
 * by supplying a custom decay function tailored to the `CachePages` structure
 * of `IProjectCache`.
 *
 * Cache files are located in the directory defined by the `PROJECT_CACHE_PATH`
 * environment variable.
 */
export class ProjectsViewsDecayService extends ViewsDecayService<IProjectCache> {
    public constructor(decayRate: number) {
        const cacheDirectory: string = process.env.PROJECT_CACHE_PATH!;
        super(cacheDirectory, decayRate, 'IProjectCache');
    }
    /**
     * @public
     * @async
     * @description
     * Applies view count decay to all project cache pages in the specified cache directory.
     * 
     * For each cache file:
     * - Iterates through all cache pages.
     * - Applies the decay function to each page based on its last accessed time.
     * - Updates the page view count using exponential decay.
     * - Writes the updated cache back to the original file.
     * 
     * This method uses a custom decay function passed to {@link ViewsDecayService.decayAllCache}.
     *
     * @returns {Promise<void>} A promise that resolves once all cache files are processed.
     */
    public async decayCachePagesViews(): Promise<void> {
        await this.decayAllCache((cache, now) => {
            const decayedCachePages = Object.entries(cache.CachePages).map(([pageNumber, cachePage]) => {
                const viewCount = cachePage.ViewCount;
                const lastAccessed = new Date(cachePage.LastAccessed);
                
                cachePage.ViewCount = this.getDecayedViews(viewCount, lastAccessed, now);
                return [Number(pageNumber), cachePage];
            });

            cache.CachePages = Object.fromEntries(decayedCachePages);

            return cache;
        });
    }
}