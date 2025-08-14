import { CACHE } from "@/data";
import { fail, success } from "@/utils";
import { Project } from "../../errors";
import { ProjectFilterUtil } from "../../utils";
import * as FetchService from "../project-db-fetcher.service";
import { fetchProjectsData } from "./fetch-projects-data";
import { getProjectDataKey } from "./get-project-data-key";
import * as CacheManager from "./project-cache-manager";

import type { ProjectResult, ProjectPageResult } from "../../types/result";
import type { ProjectStoreModels } from "../../types/store";
import type { ProjectFilter } from "../../types";

export async function createProjectDataService() {
  const cacheManager = CacheManager.createProjectCacheManager();
  const dbFetchService = await FetchService.createProjectDbFetcher();
  return new ProjectDataService(cacheManager, dbFetchService);
}

export class ProjectDataService {
  private _cacheManager: CacheManager.ProjectCacheManager;
  private _dbFetchService: FetchService.ProjectDbFetcher;

  public constructor(
    projectCacheManager: CacheManager.ProjectCacheManager,
    projectDbFetchService: FetchService.ProjectDbFetcher
  ) {
    this._cacheManager = projectCacheManager;
    this._dbFetchService = projectDbFetchService;
  }

  /**
   * @param param0
   * todo: document this
   */
  public async getProjectByPageAndId(options: {
    pageNumber: number;
    projectId: number;
    rawFilter: ProjectFilter;
  }) {
    const { pageNumber, projectId, rawFilter } = options;
    const pageResult = await this.getOrCreatePage(pageNumber, rawFilter);

    if (!pageResult.success) return pageResult; //  fail retrieving page.
    const project = pageResult.result.projects.find(
      (project) => project.project.projectId === projectId
    );

    return project
      ? success(project, pageResult.source)
      : fail(
          new Project.ErrorClass({
            name: "MISSING_PROJECT_IN_PAGE_ERROR",
            message:
              "Project with specified id could not be found in the projects page.",
          })
        );
  }

  /**
   * @description
   * @param pageNumber
   * todo: document this
   */
  public async getOrCreatePage(
    pageNumber: number,
    rawFilter: ProjectFilter
  ): Promise<ProjectPageResult> {
    const filter = ProjectFilterUtil.normalizeFilter(rawFilter); //  normalize filter early
    const resultRecord = await this.getProjects(filter);

    if (!resultRecord.success) return resultRecord; // failed loading projects. return result fail object.

    const cache = resultRecord.result;
    const pageResult = await this._cacheManager.getPage(cache, pageNumber);
    if (!pageResult.success && pageResult.error.name === "MISSING_PAGE_ERROR") {
      if (resultRecord.source === "BACKUP_CACHE") {
        const error = new Project.ErrorClass({
          name: "CACHE_MANAGER_BACKUP_READONLY_MODIFICATION_ERROR",
          message: "Back up cache is readonly and cannot be modified.",
        });
        return fail(error);
      }

      return await this.createNewPage({ cache, pageNumber, filter });
    }

    return pageResult;
  }

  /**
   * @description Asynchronously fetches a page from the database, loading it into
   * the in memory cache.
   * @param loadOptions
   * @returns
   * todo: update documentation
   */
  public async createNewPage(loadOptions: {
    cache: ProjectStoreModels.Store;
    pageNumber: number;
    filter?: ProjectFilter;
  }): Promise<ProjectPageResult> {
    const { cache, pageNumber, filter } = loadOptions;

    const fetchResult = await this.fetchProjects({
      includeCount: false,
      pageNumber,
      filter,
    });

    if (!fetchResult.success) return fetchResult; //  fetch fail, return fail result.

    const { pageRecord } = fetchResult.result;
    const result = await this._cacheManager.createAndStorePage({
      currentDate: new Date(),
      cache,
      pageNumber,
      projects: pageRecord[pageNumber],
    });

    return result.success ? { ...result, source: "DATABASE" } : result;
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
    if (loadResult.success) return loadResult; //  success loading cache.

    const fetchResult = await this.fetchProjects({
      includeCount: true,
      pageNumber: 1,
      filter,
    });
    if (fetchResult.success)
      //  todo: add logging for each retry
      for (let i = 0; i < 3; i++) {
        const createResult = await this._cacheManager.createCache({
          currentDate: new Date(),
          ...fetchResult.result,
        });

        if (createResult.success)
          return { ...createResult, source: "DATABASE" }; //  success creating cache from database.
      }

    const backupKey = getProjectDataKey({ isHardBackup: true });
    //  !Throws Env.ErrorClass: CACHE | returns null on failure.
    const backupResult = await this._cacheManager.loadBackupCache({
      backupKey,
    });

    if (backupResult.success) return backupResult; //  success loading backup.

    const error = new Project.ErrorClass({
      name: "RESOLVE_PROJECTS_ERROR",
      message: "All fall back methods for resolving projects failed.",
    });
    return fail(error);
  }

  /** Wrapper for {@link fetchProjectsData} utility function. */
  private async fetchProjects(options: {
    includeCount?: boolean;
    pageNumber: number;
    filter?: ProjectFilter;
  }) {
    const { includeCount, pageNumber, filter } = options;
    const pageSize = CACHE.PROJECT_CACHE.PAGE_SIZE;
    return await fetchProjectsData(
      this._dbFetchService,
      {
        includeCount,
        pageStart: pageNumber,
        pageSize,
        isAscending: false,
        filter,
      },
      { maxRetries: 3, retryDelayMs: 1000 }
    );
  }
}
