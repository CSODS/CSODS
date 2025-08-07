import { createJsonFileService, JsonFileService } from "@/services";
import { ProjectCacheService } from "./project-cache.service";
import { CachePageRecord, IProjectCache, IProjectCachePage } from "../../types";

export async function createProjectCachePageService() {
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
   * @async
   * @description Retrieves a specific page of project data from the cache.
   *
   * If the requested page exists in the in-memory cache, updates both the
   * top-level and specific cache page’s `viewCount` and `lastAccessed`.
   *
   * Throws an error if the cache is not initialized.
   *
   * @param pageNumber - The number of the page to retrieve (1-based index).
   * @returns A `Promise` that resolves to the requested cached page.
   */
  public async getCachePage(pageNumber: number): Promise<IProjectCachePage> {
    const { _logger } = this;

    try {
      this._jsonFileService.assertDataNotNull(this._cache);

      _logger.info(`[getCachePage] Attempting to retrieve page ${pageNumber}`);

      if (this.isPageOutOfBounds(this._cache.totalPages, pageNumber))
        //  todo: custom error
        throw new Error(`Page ${pageNumber} is out of bounds.`);

      if (this.isPageMissingFromCache(this._cache.cachePages, pageNumber))
        //  todo: custom error
        throw new Error(`Page ${pageNumber} is not in cache.`);

      _logger.info(
        `[getCachePage] Success retrieving page ${pageNumber} from cache.`
      );

      await this.updateViewCount(pageNumber);

      return this._cache.cachePages[pageNumber];
    } catch (err) {
      //  todo: better error handling
      _logger.error("[getCachePage] Failed retrieving cache page: ", err);
      throw err;
    }
  }
  /**
   * @description Verifies if the provided `pageNumber` is out of the total page
   * range.
   * @param totalPages
   * @param pageNumber
   * @returns `true` if the page is out of bounds and `false` otherwise.
   */
  public isPageOutOfBounds(totalPages: number, pageNumber: number): boolean {
    return pageNumber === 0 || pageNumber > totalPages;
  }

  /**
   * @private
   * @async
   * @description Increments the visit count for a specific page number within
   * the in-memory cache and persists the updated cache to a JSON file.
   *
   * Updates both the top-level and specific cache page’s `viewCount`
   * and `lastAccessed`.
   *
   * It then asynchronously writes the cache back into the file `json` file.
   *
   * If any error occurs during the cache update or file writing process, the
   * original exception is caught and re-thrown as a new `Error` to propagate
   * the failure.
   *
   * @param pageNumber - The page number whose visit count needs to be
   * incremented.
   * @returns A Promise that resolves when the page view count has been
   * successfully updated and persisted.
   */
  private async updateViewCount(pageNumber: number): Promise<number> {
    const { _logger } = this;
    try {
      this._jsonFileService.assertDataNotNull(this._cache);
      const now = new Date();

      this._cache.lastAccessed = now;
      this._cache.viewCount += 1;

      this._cache.cachePages[pageNumber].lastAccessed = now;
      this._cache.cachePages[pageNumber].viewCount += 1;

      this._cache = await this.persistCache(this._cache);

      _logger.info(
        `[updateViewCount] Updated view count of page: ${pageNumber}.`
      );

      return this._cache.cachePages[pageNumber].viewCount;
    } catch (err) {
      _logger.error(`[updateViewCount] Failed updating view count: `, err);
      throw err;
    }
  }

  /**
   * @async
   * @description Asynchronously stores a new cache page into the projects cache.
   * Updates the internal date state, increments the view count of the top level
   * cache, then writes the cache back into the json file. If the write operation
   * fails, the newly added page is removed from the in-memory cache and the error
   * is re-thrown.
   *
   * Throws an error if the cache is not initialized.
   *
   * @param pageNumber The page number of the cache page to be added.
   * @param cachePage The {@link IProjectCachePage} to be inserted
   * into the cache.
   * @return A `Promise` that resolves to the successfully inserted cache page.
   */
  public async storeCachePage({
    pageNumber,
    cachePage,
  }: {
    pageNumber: number;
    cachePage: IProjectCachePage;
  }): Promise<IProjectCachePage> {
    const { _logger, _filename } = this;

    try {
      _logger.info(
        `[storeCachePage] Attempting to store page: ${pageNumber} in cache: ${_filename}.`
      );

      this._jsonFileService.assertDataNotNull(this._cache);

      const now = new Date();

      this._cache.lastAccessed = now;
      this._cache.viewCount += 1;
      this._cache.cachePages[pageNumber] = cachePage;

      const storedCache = await this.persistCache(this._cache);

      if (!storedCache) throw new Error("Failed writing cache to file.");

      _logger.info(
        `[storeCachePage] Success storing page: ${pageNumber} in cache: ${_filename}.`
      );

      return storedCache.cachePages[pageNumber];
    } catch (err) {
      if (
        this._cache !== null &&
        !this.isPageMissingFromCache(this._cache.cachePages, pageNumber)
      ) {
        delete this._cache.cachePages[pageNumber];
      }

      _logger.error("[storeCachePage] Failed storing new cache page: ", err);

      throw err;
    }
  }

  /**
   * @description Checks whether a given page number does not exist in the cache.
   *
   * @param cachePages - The current cache pages.
   * @param pageNumber - The page number to verify.
   * @returns `true` if the page is missing from the cache, otherwise `false`.
   */
  public isPageMissingFromCache(
    cachePages: CachePageRecord,
    pageNumber: number
  ): boolean {
    return !Object.keys(cachePages).includes(pageNumber.toString());
  }
}
