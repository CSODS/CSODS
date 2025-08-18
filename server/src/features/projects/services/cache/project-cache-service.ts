import { AbstractCacheService } from "@/services/abstract-cache-service";
import { createJsonService, JsonService } from "@/services/json-file-service";
import { ProjectsCacheLogger } from "@/utils";
import { ProjectPage } from "../../errors";

import type { ProjectStoreModels } from "../../types/store";

export async function createProjectCacheService() {
  const jsonFileServiceInstance = createJsonService<ProjectStoreModels.Store>(
    "ProjectStoreModels.Store"
  );
  return new ProjectCacheService(jsonFileServiceInstance);
}
/**
 * @class ProjectCacheService
 * @extends AbstractCacheService
 * @description Manages the caching of project data, including reading from and
 * writing to JSON files.
 * This class ensures efficient retrieval of project data by utilizing an
 * in-memory cache and persistent JSON storage.
 */
export class ProjectCacheService extends AbstractCacheService<
  ProjectStoreModels.Store,
  ProjectCacheService
> {
  public constructor(jsonFileService: JsonService<ProjectStoreModels.Store>) {
    const logger = ProjectsCacheLogger;
    const cachePath = process.env.PROJECT_CACHE_PATH!;
    super(logger, jsonFileService, cachePath);
  }

  public getTotalPages(): number | null {
    return this._cache?.totalPages ?? null;
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
    cache: ProjectStoreModels.Store;
    pageNumber: number;
    cachePage: ProjectStoreModels.Page;
  }): Promise<ProjectStoreModels.Page> {
    const { _log, _filename } = this;
    const info = (msg: string) => _log.info("storeCachePage", msg);
    const error = (msg: string, err?: unknown) =>
      _log.error("storeCachePage", msg, err);

    info(`Attempting to store page: ${pageNumber} in cache: ${_filename}`);

    const now = new Date();
    try {
      //  !Throws JsonError: NULL_DATA_ERROR
      this.assertCacheNotNull(cache);

      const newCache: ProjectStoreModels.Store = {
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

      info(`Success storing page: ${pageNumber} in cache: ${_filename}.`);
      return storedCache.pages[pageNumber];
    } catch (err) {
      error("Failed storing new cache page: ", err);
      throw err;
    }
  }

  /**
   * @description Retrieves a specific page of project data from the cache.
   * Then updates the top-level and specific cache page’s `viewCount` and
   * `lastAccessed`.
   * @throws {ProjectPage.ErrorClass} `PAGE_OUT_OF_BOUNDS_ERROR` | `MISSING_PAGE_ERROR`
   * @throws {CacheError} `INVALID_CACHE_ERROR` | `CACHE_PERSIST_ERROR`
   */
  public async getCachePage(
    cache: ProjectStoreModels.Store,
    pageNumber: number
  ): Promise<ProjectStoreModels.Page> {
    const { _log } = this;
    const info = (msg: string) => _log.info("getCachePage", msg);
    const error = (msg: string, err?: unknown) =>
      _log.error("getCachePage", msg, err);

    try {
      info(`Attempting to retrieve page ${pageNumber}...`);

      if (pageNumber === 0 || pageNumber > cache.totalPages)
        throw new ProjectPage.ErrorClass({
          name: "PAGE_OUT_OF_BOUNDS_ERROR",
          message: `Page ${pageNumber} is out of bounds.`,
        });

      if (this.isPageMissingFromCache(cache.pages, pageNumber))
        throw new ProjectPage.ErrorClass({
          name: "MISSING_PAGE_ERROR",
          message: `Page ${pageNumber} is not in cache.`,
        });

      info(`Success retrieving page ${pageNumber} from cache.`);

      //  !Throws CacheError: INVALID_CACHE_ERROR or CACHE_PERSIST_ERROR
      const updatedCache = await this.updateViewCount(cache, pageNumber);

      return updatedCache.pages[pageNumber];
    } catch (err) {
      error("Failed retrieving cache page: ", err);
      throw err; // * all errors controlled
    }
  }

  /** Checks whether a given page number does not exist in the cache. */
  public isPageMissingFromCache(
    cachePages: ProjectStoreModels.PageRecord,
    pageNumber: number
  ): boolean {
    return !Object.keys(cachePages).includes(pageNumber.toString());
  }

  /**
   * @description Updates view count and last access time for a cache page.
   * Persists the cache.
   * @throws {CacheError} `INVALID_CACHE_ERROR` | `CACHE_PERSIST_ERROR`
   */
  protected async updateViewCount(
    cache: ProjectStoreModels.Store,
    pageNumber: number
  ): Promise<ProjectStoreModels.Store> {
    const now = new Date();
    const newCache: ProjectStoreModels.Store = {
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

  /**
   * @protected
   * @override
   * @method isCacheValid
   * @description Checks if the cache object is not `null` and contains at least
   * one page.
   *
   * @param cache - The project cache to check.
   * @returns `true` if the cache is not `null` and has pages, otherwise `false`.
   */
  protected override isCacheValid(
    cache: ProjectStoreModels.Store | null
  ): boolean {
    return cache !== null && Object.keys(cache.pages).length > 0;
  }
}
