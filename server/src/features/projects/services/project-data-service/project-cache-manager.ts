import { EnvError } from "@/error";
import { IProjectDetails } from "@/features/projects/types";
import { fail, success } from "@/utils";
import {
  createProjectCachePageService,
  ProjectCachePageService,
} from "../cache";
import { IProjectFilter } from "../repositories";
import { buildProjectsData } from "./build-projects-data";
import {
  normalizeProjectError,
  ProjectError,
} from "./project-data-service.error";
import { ProjectResult } from "./project-data-service.type";

export function createProjectCacheManager() {
  const cachePageService = createProjectCachePageService();
  return new ProjectCacheManager(cachePageService);
}

/**
 * todo: add docs
 */
export class ProjectCacheManager {
  private _projectCachePageService: ProjectCachePageService;

  public constructor(projectCachePageService: ProjectCachePageService) {
    this._projectCachePageService = projectCachePageService;
  }

  /**
   * @description Asychronously attempts to load and return a backup cache.
   * is not configured.
   * todo: update docs
   */
  public async loadBackupCache(backupOptions: {
    filename: string;
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

      const { filename } = backupOptions;
      this.setFilename(filename);

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
      const projects = await this._projectCachePageService.loadCache();
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
  public async createCache(createParams: {
    totalPages: number;
    currentDate: Date;
    pageRecord: Record<number, IProjectDetails[]>;
  }): Promise<ProjectResult> {
    try {
      const newCache = buildProjectsData(createParams);

      //  !throws CacheError: INVALID_CACHE_ERROR | CACHE_PERSIST_ERROR
      const storedCache = await this._projectCachePageService.persistCache(
        newCache
      );
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
    return this._projectCachePageService.setCachePath(newCachePath);
  }

  public setFilename(newFilename: string) {
    return this._projectCachePageService.setFilename(newFilename);
  }
}
