import { CACHE } from "@/data";
import { EnvError } from "@/error";
import { fail, success } from "@/utils";
import {
  CachePageRecord,
  IProjectCache,
  IProjectCachePage,
  IProjectDetails,
} from "../../types";
import { ProjectCachePageService } from "../cache";
import { ProjectDbFetchService } from "../project-db-fetch.service";
import { IProjectFilter, ProjectFilter } from "../repositories";
import { buildProjectsData } from "./build-projects-data";
import { fetchProjectsData } from "./fetch-projects-data";
import { getCacheFilename } from "./get-cache-filename";
import {
  normalizeProjectError,
  ProjectError,
} from "./project-data-service.error";
import { ProjectResult } from "./project-data-service.type";

export class ProjectDataService {
  private _cachePageService: ProjectCachePageService;
  private _dbFetchService: ProjectDbFetchService;

  public constructor(
    projectCachePageService: ProjectCachePageService,
    projectDbFetchService: ProjectDbFetchService
  ) {
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
  public async loadNewCachePage(loadOptions: {
    pageNumber: number;
    filter?: IProjectFilter;
  }): Promise<IProjectCachePage> {
    const { pageNumber, filter } = loadOptions;
    try {
      const cache = this._cachePageService.getCache();
      this._cachePageService.assertCacheNotNull(cache);

      const pageSize = CACHE.PROJECT_CACHE.PAGE_SIZE;
      const projects = (
        await this._dbFetchService.fetchProjectsPages({
          pageStart: pageNumber,
          pageSize,
          filter,
        })
      )[pageNumber];

      const now = new Date();
      const cachePage: IProjectCachePage = {
        createdOn: now,
        lastAccessed: now,
        viewCount: 1,
        totalPages: cache.totalPages,
        projects,
      };

      const storedPage = await this._cachePageService.storeCachePage({
        pageNumber,
        cachePage,
      });

      return storedPage;
    } catch (err) {
      //  todo: handle errors
      throw err;
    }
  }
  /**
   * @async
   * @description Asynchronously retrieves data from a resolved cache whose key is
   * generated from an {@link IProjectFilter} object. If both cache loading and
   * creation fails, attempts to load data from a backup. The final value is
   * then returned.
   * @param filterOptions Optional filtering parameters used to narrow down cached
   * projects.
   * @returns A `Promise` that resolves to the loaded cache, or `null` if no results
   * were loaded from an active filter, or all loading attempts failed.
   * todo: update docs
   */
  public async getProjects(
    filterOptions?: IProjectFilter
  ): Promise<ProjectResult> {
    //  todo: replace with static class method implementation for better readability
    let filter: ProjectFilter | undefined = new ProjectFilter(filterOptions);
    filter = filter.isEmpty() ? undefined : filter;

    //  todo: maybe move filename generation and setting to resolveProjects to make this a pure public wrapper.

    const filename = getCacheFilename(
      this._cachePageService.generateCacheFilename,
      {
        isToday: true,
        filter,
        isFiltered: !!filter,
      }
    );

    this._cachePageService.setFilename(filename);
    const resolveResult = await this.resolveProjects({ filter });
    return resolveResult;
  }

  /**
   * @async
   * @description Wrapper for setCache method that returns `null` on failure.
   * @returns
   * todo: update docs
   */
  public async loadCache(): Promise<ProjectResult> {
    try {
      //  !throws CacheError: CACHE_PARSE_ERROR | INVALID_CACHE_ERROR.
      const projects = await this._cachePageService.loadCache();
      return success(projects);
    } catch (err) {
      //  todo: log error maybe
      const error = new ProjectError({
        name: "LOAD_FROM_CACHE_ERROR",
        message: "Error loading projects from cache.",
        cause: err,
      });
      return fail(error);
    }
  }

  /**
   * @description Asynchronously attempts to create a new cache by fetching data
   * from the database, building a new cache, then persisting it to the cache
   * storage with {@link ProjectCachePageService}.
   * @param createOptions.currentDate The current date to denote when the cache
   * is created.
   * @param createOptions.pageSize Denotes how many projects will be stored in
   * each page of the cache.
   * @param createOptions.filter An optional {@link IProjectFilter} object for
   * filtering the contents the database that will be stored in the cache.
   * @returns A `Promise` that resolves to the {@link IProjectCache} or `null`
   * if the cache creation fails.
   * todo: update docs
   */
  public async createCache(createOptions: {
    totalPages: number;
    currentDate: Date;
    pageRecord: Record<number, IProjectDetails[]>;
  }): Promise<ProjectResult> {
    try {
      //  todo: add logging
      //  !throws ProjectError: FETCH_ERROR
      //  todo: pipeline this with async/await array destructuring for fetchCacheData results

      const newCache = buildProjectsData(createOptions);

      //  !throws CacheError: INVALID_CACHE_ERROR | CACHE_PERSIST_ERROR
      const storedCache = await this._cachePageService.persistCache(newCache);
      return success(storedCache);
    } catch (err) {
      //  todo: log error
      const error = normalizeProjectError({
        name: "CREATE_NEW_CACHE_ERROR",
        message: "Error creating new projects cache.",
        err,
      });
      return fail(error);
    }
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
    filter?: IProjectFilter;
  }): Promise<ProjectResult> {
    const loadResult = await this.loadCache();

    if (loadResult.success) return loadResult;

    const { PAGE_SIZE } = CACHE.PROJECT_CACHE;
    for (let i = 0; i < 3; i++) {
      //  todo: make retries configurable via a constant in CACHE.PROJECT_CACHE.
      //  todo: add a short backoff between attempts to prevent hammering the DB if something is wrong.
      let fetchResult;
      try {
        //  !Throws ProjectError: DB_FETCH_ERROR
        fetchResult = await fetchProjectsData(this._dbFetchService, {
          filter,
          pageSize: PAGE_SIZE,
        });
      } catch (err) {
        //  todo: log db error
        break;
      }

      const createResult = await this.createCache({
        currentDate: new Date(),
        ...fetchResult,
      });

      if (createResult.success) return createResult;
    }

    //  !Throws EnvError: CACHE | returns null on failure.
    const backupResult = await this.loadBackupCache();

    if (backupResult.success) return backupResult;

    const error = new ProjectError({
      name: "RESOLVE_PROJECTS_ERROR",
      message: "All fall back methods for resolving projects failed.",
    });
    return fail(error);
  }

  /**
   * @description Asychronously attempts to load and return a backup cache.
   * is not configured.
   * todo: update docs
   */
  private async loadBackupCache(): Promise<ProjectResult> {
    //  todo: add logging
    try {
      const backupPath = process.env.DEFAULT_CACHE_PATH!;
      if (!backupPath)
        throw new EnvError({
          name: "CACHE",
          message: "Default cache path not configured.",
        });

      this._cachePageService.setCachePath(backupPath);

      const filename = getCacheFilename(
        this._cachePageService.generateCacheFilename,
        { isHardBackup: true }
      );
      this._cachePageService.setFilename(filename);

      const loadResult = await this.loadCache();

      if (loadResult.success) return loadResult;

      throw loadResult.error; //  ProjectError type
    } catch (err) {
      const error = normalizeProjectError({
        name: "LOAD_BACKUP_ERROR",
        message: "Failed loading backup projects cache.",
        err,
      });
      return fail(error);
    }
  }
}
