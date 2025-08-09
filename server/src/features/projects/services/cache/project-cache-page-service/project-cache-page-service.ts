import {
  CachePageRecord,
  IProjectCache,
  IProjectCachePage,
} from "@/features/projects/types";
import {
  CacheError,
  createJsonFileService,
  JsonError,
  JsonFileService,
} from "@/services";
import { ProjectCachePageError } from "@/features/projects/errors";
import { ProjectCacheService } from "../project-cache-service";

export function createProjectCachePageService() {
  const jsonFileServiceInstance =
    createJsonFileService<IProjectCache>("IProjectCache");
  return new ProjectCachePageService(jsonFileServiceInstance);
}

/**
 * @class ProjectCachePageService
 * @extends ProjectCacheService
 * @description Manages the caching of project page data, including reading from
 * and writing to JSON files, handling cache pages. This class ensures efficient
 * retrieval of project page data by utilizing an in-memory cache and persistent
 * JSON storage.
 */
export class ProjectCachePageService extends ProjectCacheService {
  /**
   * @constructor
   * @description
   * Calls the parent class constructor with the {@link JsonFileService}
   * instance.
   */
  public constructor(jsonFileService: JsonFileService<IProjectCache>) {
    super(jsonFileService);
  }
  /**
   * @description Asynchronously stores a new cache page into the projects cache.
   * Updates the `lastAccessed` and `viewCount` field of the top level cache, then
   * writes the cache back into the json file.
   * @throws {JsonError} `NULL_DATA_ERROR`
   * @throws {CacheError} `INVALID_CACHE_ERROR` | `CACHE_PERSIST_ERROR`
   */
  public async storeCachePage({
    cache,
    pageNumber,
    cachePage,
  }: {
    cache: IProjectCache;
    pageNumber: number;
    cachePage: IProjectCachePage;
  }): Promise<IProjectCachePage> {
    const { _logger, _filename } = this;

    try {
      _logger.info(
        `[storeCachePage] Attempting to store page: ${pageNumber} in cache: ${_filename}.`
      );

      //  !Throws JsonError: NULL_DATA_ERROR
      this.assertCacheNotNull(cache);

      const now = new Date();

      const newCache: IProjectCache = {
        //  ! top level deep copy
        ...cache,
        lastAccessed: now,
        viewCount: cache.viewCount + 1,
        //  ! record deep copy
        cachePages: { ...cache.cachePages },
      };
      newCache.cachePages[pageNumber] = cachePage;

      //  !Throws CacheError: INVALID_CACHE_ERROR or CACHE_PERSIST_ERROR
      const storedCache = await this.persistCache(newCache);
      this._cache = newCache;

      _logger.info(
        `[storeCachePage] Success storing page: ${pageNumber} in cache: ${_filename}.`
      );

      return storedCache.cachePages[pageNumber];
    } catch (err) {
      _logger.error("[storeCachePage] Failed storing new cache page: ", err);
      throw err; //  * all errors controlled
    }
  }

  /**
   * @description Retrieves a specific page of project data from the cache.
   * Then updates the top-level and specific cache page’s `viewCount` and
   * `lastAccessed`.
   * @throws {ProjectCachePageError} `PAGE_OUT_OF_BOUNDS_ERROR` | `MISSING_PAGE_ERROR`
   * @throws {CacheError} `INVALID_CACHE_ERROR` | `CACHE_PERSIST_ERROR`
   */
  public async getCachePage(
    cache: IProjectCache,
    pageNumber: number
  ): Promise<IProjectCachePage> {
    const { _logger } = this;
    try {
      _logger.info(`[getCachePage] Attempting to retrieve page ${pageNumber}`);

      if (pageNumber === 0 || pageNumber > cache.totalPages)
        throw new ProjectCachePageError.ProjectCachePageError({
          name: "PAGE_OUT_OF_BOUNDS_ERROR",
          message: `Page ${pageNumber} is out of bounds.`,
        });

      if (this.isPageMissingFromCache(cache.cachePages, pageNumber))
        throw new ProjectCachePageError.ProjectCachePageError({
          name: "MISSING_PAGE_ERROR",
          message: `Page ${pageNumber} is not in cache.`,
        });

      _logger.info(
        `[getCachePage] Success retrieving page ${pageNumber} from cache.`
      );

      //  !Throws CacheError: INVALID_CACHE_ERROR or CACHE_PERSIST_ERROR
      await this.updateViewCount(cache, pageNumber);

      return cache.cachePages[pageNumber];
    } catch (err) {
      _logger.error("[getCachePage] Failed retrieving cache page: ", err);
      throw err; // * all errors controlled
    }
  }

  /**
   * @description Updates view count and last access time for a cache page.
   * Persists the cache.
   * @throws {CacheError} `INVALID_CACHE_ERROR` | `CACHE_PERSIST_ERROR`
   */
  private async updateViewCount(
    cache: IProjectCache,
    pageNumber: number
  ): Promise<number> {
    const now = new Date();
    const newCache: IProjectCache = {
      //  ! top level deep copy
      ...cache,
      lastAccessed: now,
      viewCount: cache.viewCount + 1,
      //  ! record deep copy
      cachePages: {
        ...cache.cachePages,
        [pageNumber]: {
          //  ! deep copy the page being modified
          ...cache.cachePages[pageNumber],
          lastAccessed: now,
          viewCount: cache.cachePages[pageNumber].viewCount + 1,
        },
      },
    };

    //  !Throws CacheError: INVALID_CACHE_ERROR or CACHE_PERSIST_ERROR
    this._cache = await this.persistCache(newCache);

    return this._cache.cachePages[pageNumber].viewCount;
  }

  /** Checks whether a given page number does not exist in the cache. */
  public isPageMissingFromCache(
    cachePages: CachePageRecord,
    pageNumber: number
  ): boolean {
    return !Object.keys(cachePages).includes(pageNumber.toString());
  }
}
