import { IProjectCache } from "@viewmodels";
import { ViewsDecayService } from "./viewsDecayService.js";

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
     * Applies exponential view count decay to all project cache files and their individual cache pages.
     * 
     * For each cache file:
     * - Optionally applies decay to the overall project-level `ViewCount` (if `decayTopLevel` is `true`).
     * - Iterates through all entries in `CachePages`.
     * - Applies exponential decay to each page's view count using its `LastAccessed` timestamp.
     * - Writes the updated cache object back to its original JSON file.
     * 
     * This method overrides the default behavior by supplying a custom decay function
     * to {@link ViewsDecayService.decayAllCache}, enabling fine-grained page-level decay
     * with optional support for top-level cache view decay.
     *
     * @param {DecayOptions} [options={}] - Optional configuration for the decay operation.
     * @param {boolean} [options.decayTopLevel=true] - Whether to apply decay to the top-level `ViewCount`
     * of the cache file. If set to `false`, only individual pages will be decayed.
     * 
     * @returns {Promise<void>} A promise that resolves once all cache files have been processed and updated.
     */
    public async decayCachePagesViews({ decayTopLevel= true }: DecayOptions= {}): Promise<void> {
        await this.decayAllCache((cache, now) => {

            if (decayTopLevel)
                //  Decay the entire cache (default decay behavior).
                cache = this.defaultDecayFunc(cache, now);

            //  Decay the cache pages.
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

/**
 * @interface DecayOptions
 * @description
 * Configuration options for a cache view decay operation.
 * Used to control whether top-level view count decay should be applied in addition
 * to per-page decay.
 *
 * @property {boolean} [decayTopLevel=true] - 
 * If `true`, applies decay to the top-level `ViewCount` of the cache.
 * If `false`, only the individual `CachePages` view counts are decayed.
 */
interface DecayOptions {
    decayTopLevel?: boolean
}