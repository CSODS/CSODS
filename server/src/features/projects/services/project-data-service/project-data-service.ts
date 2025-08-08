import { CACHE } from "@/data";
import { EnvError } from "@/error";
import {
  CachePageRecord,
  IProjectCache,
  IProjectCachePage,
  IProjectDetails,
} from "../../types";
import { ProjectCachePageService } from "../cache";
import { ProjectDbFetchService } from "../project-db-fetch.service";
import { IProjectFilter, ProjectFilter } from "../repositories";
import { getCacheFilename } from "./get-cache-filename";
import { ProjectError } from "./project-data-service.error";
import { ProjectResult } from "./project-data-service.type";

export class ProjectDataService {
  private _projectCachePageService: ProjectCachePageService;
  private _projectDbFetchService: ProjectDbFetchService;

  public constructor(
    projectCachePageService: ProjectCachePageService,
    projectDbFetchService: ProjectDbFetchService
  ) {
    this._projectCachePageService = projectCachePageService;
    this._projectDbFetchService = projectDbFetchService;
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
      const cache = this._projectCachePageService.getCache();
      //  ! throws TypeError if cache is null.
      this._projectCachePageService.assertCacheNotNull(cache);

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
      const cache = this._projectCachePageService.getCache();
      this._projectCachePageService.assertCacheNotNull(cache);

      const pageSize = CACHE.PROJECT_CACHE.PAGE_SIZE;
      const projects = (
        await this._projectDbFetchService.fetchProjectsPages({
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

      const storedPage = await this._projectCachePageService.storeCachePage({
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

    const filename = getCacheFilename(
      this._projectCachePageService.generateCacheFilename,
      {
        isToday: true,
        filter,
        isFiltered: !!filter,
      }
    );

    this._projectCachePageService.setFilename(filename);
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
      const projects = await this._projectCachePageService.loadCache();
      return {
        success: true,
        result: projects,
      };
    } catch (err) {
      //  todo: log error maybe
      return {
        success: false,
        error: {
          name: "LOAD_FROM_CACHE_ERROR",
          message: "Error loading projects from cache.",
          cause: err,
        },
      };
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
    currentDate: Date;
    pageSize: number;
    filter?: IProjectFilter;
  }): Promise<ProjectResult> {
    try {
      const { currentDate, pageSize, filter } = createOptions;
      //  todo: add logging
      //  !throws ProjectError: FETCH_ERROR
      const { totalPages, pageRecord } = await this.fetchCacheData({
        filter,
        pageSize,
      });

      const newCache = this.buildProjectCache({
        totalPages,
        currentDate,
        pageRecord,
      });

      //  !throws CacheError: INVALID_CACHE_ERROR | CACHE_PERSIST_ERROR
      const storedCache = await this._projectCachePageService.persistCache(
        newCache
      );
      return {
        success: true,
        result: storedCache,
      };
    } catch (err) {
      //  todo: log error
      const error: ProjectError =
        err instanceof ProjectError
          ? err
          : {
              name: "CREATE_NEW_CACHE_ERROR",
              message: "Error creating new projects cache.",
              cause: err,
            };
      return {
        success: false,
        error,
      };
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
      const createResult = await this.createCache({
        currentDate: new Date(),
        pageSize: PAGE_SIZE,
        filter,
      });

      if (createResult.success) return createResult;
    }

    //  !Throws EnvError: CACHE | returns null on failure.
    const backupResult = await this.loadBackupCache();

    if (backupResult.success) return backupResult;

    //
    const error = new ProjectError({
      name: "RESOLVE_PROJECTS_ERROR",
      message: "All fall back methods for resolving projects failed.",
    });

    return {
      success: false,
      error,
    };
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

      this._projectCachePageService.setCachePath(backupPath);

      const filename = getCacheFilename(
        this._projectCachePageService.generateCacheFilename,
        { isHardBackup: true }
      );
      this._projectCachePageService.setFilename(filename);

      const loadResult = await this.loadCache();

      if (loadResult.success) return loadResult;

      throw loadResult.error; //  ProjectError type
    } catch (err) {
      //  normalize error
      const error: ProjectError =
        err instanceof ProjectError
          ? err
          : {
              name: "LOAD_BACKUP_ERROR",
              message: "Failed loading backup projects cache.",
              cause: err,
            };
      return {
        success: false,
        error,
      };
    }
  }

  /**
   * @description Asynchronously fetches data required for the cache from the
   * database with an optional filter and a specified page size..
   * @returns
   * - `totalPages` - The total pages of the paginated projects.
   * - `pageRecord` - A record containing each page of t
   * @throws {ProjectError} Thrown with `name: "FETCH_ERROR"` if there are no
   * projects in the database..
   */
  private async fetchCacheData(fetchOptions: {
    filter?: IProjectFilter;
    pageSize: number;
  }) {
    const { filter, pageSize } = fetchOptions;
    const projectsCount = await this._projectDbFetchService.fetchProjectsCount(
      filter
    );

    if (projectsCount === 0)
      throw new ProjectError({
        name: "FETCH_ERROR",
        message: "Project list is empty.",
      });
    const totalPages = Math.ceil(projectsCount / pageSize);

    const pageRecord = await this._projectDbFetchService.fetchProjectsPages({
      pageStart: 1,
      pageSize,
      isAscending: false,
      filter,
    });

    return { totalPages, pageRecord };
  }

  /**
   * @description A utility method that builds a new {@link IProjectCache} object
   * from the provided arguments..
   */
  private buildProjectCache(cacheData: {
    totalPages: number;
    currentDate: Date;
    isBackup?: boolean;
    pageRecord: Record<number, IProjectDetails[]>;
  }): IProjectCache {
    const { totalPages, currentDate, isBackup, pageRecord } = cacheData;

    let cachePages: CachePageRecord = {};
    const recordEntries = Object.entries(pageRecord);
    recordEntries.forEach(([pageNumber, projects]) => {
      const numericKey = Number(pageNumber);
      cachePages[numericKey] = {
        createdOn: currentDate,
        lastAccessed: currentDate,
        viewCount: 0,
        totalPages,
        projects,
      };
    });

    return {
      totalPages,
      createdOn: currentDate,
      lastAccessed: currentDate,
      viewCount: 1,
      isBackup: isBackup ?? false,
      cachePages,
    };
  }
}
