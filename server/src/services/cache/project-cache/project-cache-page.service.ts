import { CONSTANTS } from "@data";
import {
  createJsonFileService,
  createProjectDataService,
  JsonFileService,
  ProjectDataService,
} from "@services";
import {
  CachePageRecord,
  IProjectCache,
  IProjectCachePage,
  IProjectDetails,
} from "@viewmodels";
import { ProjectCacheService } from "./project-cache.service";

const CACHE = CONSTANTS.CACHE;

export async function createProjectCachePageService() {
  const projectDataServiceInstance = await createProjectDataService();
  const jsonFileHandlerInstance =
    createJsonFileService<IProjectCache>("IProjectCache");

  return new ProjectCachePageService(
    projectDataServiceInstance,
    jsonFileHandlerInstance
  );
}

/**
 * @class ProjectCachePageService
 * @extends ProjectCacheService
 * @description Manages the caching of project page data, including reading from and writing to JSON files,
 * handling cache pages. This class ensures efficient retrieval of project page data by utilizing an
 * in-memory cache and persistent JSON storage.
 */
export class ProjectCachePageService extends ProjectCacheService {
  /**
   * @public
   * @constructor
   * @description Accepts parameters of type {@link ProjectDataService} and {@link JsonFileService}.
   * Calls the constructor of the parent class and passes an instance of the two.
   * @param projectDataService - An instance of the {@link ProjectDataService} class. Used for communicating
   * with the database.
   * @param jsonFileHandler - An instance of the {@link JsonFileService} class. A core component for the default
   * CRUD operations of the cache service.
   */
  public constructor(
    projectDataService: ProjectDataService,
    jsonFileHandler: JsonFileService<IProjectCache>
  ) {
    super(projectDataService, jsonFileHandler);
  }
  /**
   * @public
   * @async
   * @method getProjectByPageAndId
   * @description Retrieves a project by page number and project ID.
   *
   * @param pageNumber The page number to search.
   * @param projectId The ID of the project to retrieve.
   * @returns The found project or `null` if not found.
   */
  public async getProjectByPageAndId(
    pageNumber: number,
    projectId: number
  ): Promise<IProjectDetails | null> {
    const cachePage: IProjectCachePage | null = await this.getOrCreatePage(
      pageNumber
    );

    this._logger.info(
      `Attempting to retrieve project with id: ${projectId}...`
    );
    const project =
      cachePage?.Projects.find((p) => p.Project.ProjectId == projectId) ?? null;

    project
      ? this._logger.info(`Project found...`)
      : this._logger.warn(`Project not found. Returning null...`);

    return project;
  }
  //
  /**
   * @public
   * @async
   * @method getOrCreatePage
   * @description Retrieves a specific page of project data from the cache.
   *
   * If the requested page exists in the in-memory cache, it returns it directly.
   * If the page is not present, it fetches the page from the database via the {@link ProjectDataService},
   * adds it to the in-memory cache, updates the cache file on disk, and then returns the new page.
   *
   * This method ensures that your cache remains up to date and self-expanding as new pages are accessed.
   *
   * @param pageNumber - The number of the page to retrieve (1-based index).
   * @returns The cached or newly fetched page, or `null` if an error occurs.
   */
  public async getOrCreatePage(
    pageNumber: number
  ): Promise<IProjectCachePage | null> {
    //  Verify if page is out of bounds.
    function isPageOutOfBounds(
      totalPages: number,
      pageNumber: number
    ): boolean {
      return pageNumber === 0 || pageNumber > totalPages;
    }

    try {
      //  Throws an exception if _cache is null.
      this._jsonFileHandler.assertDataNotNull(this._cache);

      this._logger.info(`Attempting to retrieve page ${pageNumber}`);

      if (isPageOutOfBounds(this._cache.TotalPages, pageNumber)) {
        this._logger.warn(
          `Page ${pageNumber} is out of bounds. Returning null...`
        );
        return null;
      }

      //  Attempt to retrieve page from cache.
      const cachePages: CachePageRecord = this._cache.CachePages;

      if (this.isPageMissingFromCache(cachePages, pageNumber)) {
        if (this._cache.IsBackup) {
          this._logger.warn(
            `Page ${pageNumber} is not available in backup cache. Returning null...`
          );
          return null;
        }

        //  Returns new page if successful.
        //  Throws an exception if updating or parsing the cache fails.
        return await this.setNewCachePage(pageNumber);
      }

      //  Return the cache page if found in the cache.
      await this.updateViewCount(pageNumber);
      this._logger.info("Success loading page.");
      return cachePages[pageNumber];
    } catch (err) {
      //  Return null on error.
      this._logger.error("Failed retrieving cache page.", err);
      return null;
    }
  }
  /**
   * @private
   * @async
   * @method setNewCachePage
   * @description Fetches a page from the database, adds it to the cache, and writes the updated
   * cache to disk. Also updates the 'LastAccessed' and 'VisitCount' property of the ProjectsCache.
   *
   * @param pageNumber - The page number to fetch and add.
   * @returns The newly cached page.
   * @throws {Error} If the cache is null or the write operation fails.
   */
  private async setNewCachePage(
    pageNumber: number
  ): Promise<IProjectCachePage> {
    try {
      this._jsonFileHandler.assertDataNotNull(this._cache); //  Throws an error if _cache is null.

      //  Fetch projects from database
      const projects = (
        await this._projectDataService.fetchProjectsPages({
          pageStart: pageNumber,
          pageSize: CACHE.PAGE_SIZE,
          isAscending: false,
          filter: this._filter,
        })
      )[pageNumber];

      //  Assemble cache page.
      const cachePage: IProjectCachePage = {
        CreatedOn: this._cDate,
        LastAccessed: this._cDate,
        ViewCount: 1,
        TotalPages: this._cache.TotalPages,
        Projects: projects,
      };

      this._cache.LastAccessed = this._cDate;
      this._cache.ViewCount += 1;
      this._cache.CachePages[pageNumber] = cachePage;

      await this._jsonFileHandler.writeToJsonFile(
        process.env.PROJECT_CACHE_PATH!,
        this._filename,
        this._cache
      );

      return cachePage;
    } catch (err) {
      //  if the update fails, check if a new page was added anyway, then remove it
      //  from the in memory cache.
      if (
        this._cache != null &&
        !this.isPageMissingFromCache(this._cache.CachePages, pageNumber)
      ) {
        delete this._cache.CachePages[pageNumber];
      }
      throw err;
    }
  }
  /**
   * @private
   * @method isPageMissingFromCache
   * @description Checks whether a given page number does not exist in the cache.
   *
   * @param cachePages - The current cache pages.
   * @param pageNumber - The page number to verify.
   * @returns `true` if the page is missing from the cache, otherwise `false`.
   */
  private isPageMissingFromCache(
    cachePages: CachePageRecord,
    pageNumber: number
  ): boolean {
    return !Object.keys(cachePages).includes(pageNumber.toString());
  }
  /**
   * @private
   * @async
   * @method updateViewCount
   * @description Increments the visit count for a specific page number within the in-memory cache
   * and persists the updated cache to a JSON file.
   *
   * This method first ensures that the JSON cache ({@link _cache}) is not null. It then attempts to:
   * 1. Increment the {@link IProjectCache.ViewCount} and {@link IProjectCache.LastAccessed} property of the
   * {@link _cache} and the specified `pageNumber` within the `CachePages` object in the in-memory cache.
   * 2. Asynchronously write the entire updated cache object to the designated JSON file path.
   *
   * If any error occurs during the cache update or file writing process, the original exception is caught
   * and re-thrown as a new `Error` to propagate the failure.
   *
   * @param pageNumber - The page number whose visit count needs to be incremented.
   * @returns A Promise that resolves when the page view count has been successfully updated and persisted,
   * or rejects if an error occurs during the process.
   */
  private async updateViewCount(pageNumber: number): Promise<void> {
    //  Throws TypeError if data is null.
    this._jsonFileHandler.assertDataNotNull(this._cache);
    this._cache.LastAccessed = this._cDate;
    this._cache.ViewCount += 1;
    this._cache.CachePages[pageNumber].LastAccessed = this._cDate;
    this._cache.CachePages[pageNumber].ViewCount += 1;

    //  throws an exception if update fails.
    await this._jsonFileHandler.writeToJsonFile(
      process.env.PROJECT_CACHE_PATH!,
      this._filename,
      this._cache
    );
  }
}
