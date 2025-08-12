import { ProjectCacheError } from "@/features/projects/errors";
import { Projects } from "@/features/projects/types";
import { createJsonFileService, JsonFileService } from "@/services";
import { ProjectCacheService } from "../project-cache-service";

export function createProjectCachePageService() {
  const jsonFileServiceInstance =
    createJsonFileService<Projects.Store>("Projects.Store");
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
  public constructor(jsonFileService: JsonFileService<Projects.Store>) {
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
    cache: Projects.Store;
    pageNumber: number;
    cachePage: Projects.Page;
  }): Promise<Projects.Page> {
    const { _logger, _filename } = this;

    try {
      _logger.info(
        `[storeCachePage] Attempting to store page: ${pageNumber} in cache: ${_filename}.`
      );

      //  !Throws JsonError: NULL_DATA_ERROR
      this.assertCacheNotNull(cache);

      const now = new Date();

      const newCache: Projects.Store = {
        //  ! top level deep copy
        ...cache,
        lastAccessed: now,
        viewCount: cache.viewCount + 1,
        //  ! record deep copy
        pages: { ...cache.pages },
      };
      newCache.pages[pageNumber] = cachePage;

      //  !Throws CacheError: INVALID_CACHE_ERROR or CACHE_PERSIST_ERROR
      const storedCache = await this.persistCache(newCache);
      this._cache = newCache;

      _logger.info(
        `[storeCachePage] Success storing page: ${pageNumber} in cache: ${_filename}.`
      );

      return storedCache.pages[pageNumber];
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
    cache: Projects.Store,
    pageNumber: number
  ): Promise<Projects.Page> {
    const { _logger } = this;
    try {
      _logger.info(`[getCachePage] Attempting to retrieve page ${pageNumber}`);

      if (pageNumber === 0 || pageNumber > cache.totalPages)
        throw new ProjectCacheError.PageError({
          name: "PAGE_OUT_OF_BOUNDS_ERROR",
          message: `Page ${pageNumber} is out of bounds.`,
        });

      if (this.isPageMissingFromCache(cache.pages, pageNumber))
        throw new ProjectCacheError.PageError({
          name: "MISSING_PAGE_ERROR",
          message: `Page ${pageNumber} is not in cache.`,
        });

      _logger.info(
        `[getCachePage] Success retrieving page ${pageNumber} from cache.`
      );

      //  !Throws CacheError: INVALID_CACHE_ERROR or CACHE_PERSIST_ERROR
      const updatedCache = await this.updateViewCount(cache, pageNumber);

      return updatedCache.pages[pageNumber];
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
    cache: Projects.Store,
    pageNumber: number
  ): Promise<Projects.Store> {
    const now = new Date();
    const newCache: Projects.Store = {
      //  ! top level deep copy
      ...cache,
      lastAccessed: now,
      viewCount: cache.viewCount + 1,
      //  ! record deep copy
      pages: {
        ...cache.pages,
        [pageNumber]: {
          //  ! deep copy the page being modified
          ...cache.pages[pageNumber],
          lastAccessed: now,
          viewCount: cache.pages[pageNumber].viewCount + 1,
        },
      },
    };

    //  !Throws CacheError: INVALID_CACHE_ERROR or CACHE_PERSIST_ERROR
    this._cache = await this.persistCache(newCache);

    return this._cache;
  }

  /** Checks whether a given page number does not exist in the cache. */
  public isPageMissingFromCache(
    cachePages: Projects.PageRecord,
    pageNumber: number
  ): boolean {
    return !Object.keys(cachePages).includes(pageNumber.toString());
  }
}
