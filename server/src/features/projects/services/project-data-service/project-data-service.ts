import { CACHE } from "@/data";
import { fail, success } from "@/utils";
import { IProjectCachePage, ProjectFilter } from "../../types";
import { ProjectFilterUtil } from "../../utils";
import { ProjectCachePageService } from "../cache";
import { ProjectDbFetchService } from "../project-db-fetch.service";
import { fetchProjectsData } from "./fetch-projects-data";
import { getProjectDataKey } from "./get-project-data-key";
import { ProjectCacheManager } from "./project-cache-manager";
import { ProjectError } from "./project-data-service.error";
import { ProjectPageResult, ProjectResult } from "./project-data-service.type";

export class ProjectDataService {
  private _cacheManager: ProjectCacheManager;
  private _cachePageService: ProjectCachePageService;
  private _dbFetchService: ProjectDbFetchService;

  public constructor(
    projectCacheManager: ProjectCacheManager,
    projectCachePageService: ProjectCachePageService,
    projectDbFetchService: ProjectDbFetchService
  ) {
    this._cacheManager = projectCacheManager;
    this._cachePageService = projectCachePageService;
    this._dbFetchService = projectDbFetchService;
  }

  /**
   * ! this method must be called after loading the cache into the memory.
   * @param param0
   */
  public async getProjectByPageAndId({
    pageNumber,
    projectId,
  }: {
    pageNumber: number;
    projectId: number;
  }) {
    //  get cache page
    //  get project from cache page.
  }

  /**
   * ! this method must be called after loading the cache into the memory.
   * @description
   * @param pageNumber
   */
  public async getOrCreatePage(pageNumber: number) {
    try {
      const cache = this._cachePageService.getCache();
      //  ! throws TypeError if cache is null.
      this._cachePageService.assertCacheNotNull(cache);

      //  ? get page from cache
      //  ? if out of bounds, return null
      //  ? if missing page and cache is backup, return null
      //  ? if missing page and cache isn't backup, load new page into cache.
      //  ? update view count
      //  ? return cache page.
    } catch (err) {}
  }

  /**
   * @description Asynchronously fetches a page from the database, loading it into
   * the in memory cache.
   * @param loadOptions
   * @returns
   */
  public async createNewPage(loadOptions: {
    pageNumber: number;
    filter?: ProjectFilter;
  }): Promise<ProjectPageResult> {
    const { pageNumber, filter } = loadOptions;
    const loadResult = await this.getProjects(filter);

    //  error loading projects.
    if (!loadResult.success) return loadResult;
    const cache = loadResult.result;

    const pageSize = CACHE.PROJECT_CACHE.PAGE_SIZE;
    const fetchResult = await fetchProjectsData(this._dbFetchService, {
      pageStart: pageNumber,
      pageSize,
      filter,
    });

    if (!fetchResult.success) return fetchResult; //  fetch fail, return fail result.

    const { pageRecord } = fetchResult.result;

    const projects = pageRecord[pageNumber];

    const now = new Date();
    const cachePage: IProjectCachePage = {
      createdOn: now,
      lastAccessed: now,
      viewCount: 1,
      totalPages: cache.totalPages,
      projects,
    };

    const result = await this._cacheManager.storeCachePage({
      pageNumber,
      cachePage,
    });

    return result;
  }
  /**
   * @async
   * @description Asynchronously retrieves data from a resolved cache whose key is
   * generated from an {@link ProjectFilter} object. If both cache loading and
   * creation fails, attempts to load data from a backup. The final value is
   * then returned.
   * @param rawFilter Optional filtering parameters used to narrow down cached
   * projects.
   * @returns A `Promise` that resolves to the loaded cache, or `null` if no results
   * were loaded from an active filter, or all loading attempts failed.
   * todo: update docs
   */
  public async getProjects(rawFilter?: ProjectFilter): Promise<ProjectResult> {
    const filter = ProjectFilterUtil.normalizeFilter(rawFilter);

    const resolveResult = await this.resolveProjects({ filter });
    return resolveResult;
  }

  /**
   * @async
   * @description Asynchronously attempts to load the cache into memory. If the
   * operation fails, attempts to create a new cache for up to three times if
   * needed.
   * @param filter An object containing filter details for the database query.
   * @returns A `Promise` that resolves to the loaded or newly created cache,
   * or `null` if both load and creation operations failed.
   * todo: update docs
   * todo: log each fall back stage.
   */
  private async resolveProjects({
    filter,
  }: {
    filter?: ProjectFilter;
  }): Promise<ProjectResult> {
    const dataKey = getProjectDataKey({
      isToday: true,
      filter,
      isFiltered: !!filter,
    });

    this._cacheManager.setFilename(dataKey);
    const loadResult = await this._cacheManager.loadCache();

    if (loadResult.success) return loadResult;

    const { PAGE_SIZE } = CACHE.PROJECT_CACHE;

    //  todo: make retries configurable via a constant in CACHE.PROJECT_CACHE.
    //  todo: add a short backoff between attempts to prevent hammering the DB if something is wrong.
    const fetchResult = await fetchProjectsData(this._dbFetchService, {
      pageStart: 1,
      pageSize: PAGE_SIZE,
      isAscending: false,
      filter,
    });

    if (fetchResult.success)
      //  todo: add logging for each retry
      for (let i = 0; i < 3; i++) {
        const createResult = await this._cacheManager.createCache({
          currentDate: new Date(),
          ...fetchResult.result,
        });

        if (createResult.success) return createResult;
      }

    const backupKey = getProjectDataKey({ isHardBackup: true });
    //  !Throws EnvError: CACHE | returns null on failure.
    const backupResult = await this._cacheManager.loadBackupCache({
      backupKey,
    });

    if (backupResult.success) return backupResult;

    const error = new ProjectError({
      name: "RESOLVE_PROJECTS_ERROR",
      message: "All fall back methods for resolving projects failed.",
    });
    return fail(error);
  }
}
