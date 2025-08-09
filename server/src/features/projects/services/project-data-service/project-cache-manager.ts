import { EnvError } from "@/error";
import {
  IProjectCache,
  IProjectCachePage,
  IProjectDetails,
} from "@/features/projects/types";
import { fail, success } from "@/utils";
import {
  createProjectCachePageService,
  ProjectCachePageService,
} from "../cache";
import { buildProjectsData } from "./build-projects-data";
import {
  normalizeProjectError,
  ProjectError,
} from "./project-data-service.error";
import { ProjectPageResult, ProjectResult } from "./project-data-service.type";

export function createProjectCacheManager() {
  const cachePageService = createProjectCachePageService();
  return new ProjectCacheManager(cachePageService);
}

/**
 * todo: add docs
 */
export class ProjectCacheManager {
  private _cachePageService: ProjectCachePageService;

  public constructor(projectCachePageService: ProjectCachePageService) {
    this._cachePageService = projectCachePageService;
  }

  /**
   * @description wrapper for `getCachePage` method that returns a `ProjectResult` type.
   * @param cache
   * @param pageNumber
   * @returns
   */
  public async getPage(
    cache: IProjectCache,
    pageNumber: number
  ): Promise<ProjectPageResult> {
    try {
      //  !Throws ProjectCachePageError: PAGE_OUT_OF_BOUNDS_ERROR | MISSING_PAGE_ERROR
      //  !Throws CacheError: INVALID_CACHE_ERROR | CACHE_PERSIST_ERROR
      const page = await this._cachePageService.getCachePage(cache, pageNumber);
      return success(page);
    } catch (err) {
      const error = normalizeProjectError({
        name: "PAGE_RETRIEVAL_ERROR",
        message: "Failed retrieving page from cache.",
        err,
      });
      return fail(error);
    }
  }
  /**
   * @description Asynchronously stores a new page to the cache.
   * @param page
   * @returns
   * todo: update docs
   * todo: set filename when creating
   */
  public async createAndStorePage(page: {
    currentDate: Date;
    cache: IProjectCache; //  used for re-storing cahce.
    pageNumber: number;
    projects: IProjectDetails[];
  }): Promise<ProjectPageResult> {
    const { currentDate, cache, pageNumber, projects } = page;
    try {
      const cachePage: IProjectCachePage = {
        createdOn: currentDate,
        lastAccessed: currentDate,
        viewCount: 1,
        totalPages: cache.totalPages,
        projects,
      };
      //  !Throws JsonError: NULL_DATA ERROR or CacheError: INVALID_CACHE_ERROR | CACHE_PERSIST_ERROR
      const storedPage = await this._cachePageService.storeCachePage({
        cache,
        pageNumber,
        cachePage,
      });
      return success(storedPage);
    } catch (err) {
      const error = normalizeProjectError({
        name: "STORE_CACHE_PAGE_ERROR",
        message: `Error storing new cache page with page number: ${page.pageNumber}`,
        err,
      });
      return fail(error);
    }
  }

  /**
   * @description Asychronously attempts to load and return a backup cache.
   * is not configured.
   * todo: update docs
   */
  public async loadBackupCache(backupOptions: {
    backupKey: string;
  }): Promise<ProjectResult> {
    //  todo: add logging
    try {
      const backupPath = process.env.DEFAULT_CACHE_PATH!;
      if (!backupPath)
        throw new EnvError({
          name: "CACHE",
          message: "Default cache path not configured.",
        });

      this.setCachePath(backupPath);

      const { backupKey } = backupOptions;
      this.setFilename(backupKey);

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
   * @param createOptions.filter An optional {@link ProjectFilter} object for
   * filtering the contents the database that will be stored in the cache.
   * @returns A `Promise` that resolves to the {@link IProjectCache} or `null`
   * if the cache creation fails.
   * todo: update docs
   */
  public async createCache(createParams: {
    totalPages: number;
    currentDate: Date;
    pageRecord: Record<number, IProjectDetails[]>;
  }): Promise<ProjectResult> {
    try {
      const newCache = buildProjectsData(createParams);

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

  public setCachePath(newCachePath: string) {
    return this._cachePageService.setCachePath(newCachePath);
  }

  public setFilename(key: string) {
    const filename = this._cachePageService.generateCacheFilename(key);
    return this._cachePageService.setFilename(key);
  }
}
