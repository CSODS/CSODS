import {
  AbstractCacheService,
  createJsonFileService,
  JsonFileService,
} from "@/services";
import { ProjectsCacheLogger } from "@/utils";
import { IProjectCache } from "../../types";

export async function createProjectCacheService() {
  const jsonFileServiceInstance =
    createJsonFileService<IProjectCache>("IProjectCache");
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
export class ProjectCacheService extends AbstractCacheService<IProjectCache> {
  public constructor(jsonFileService: JsonFileService<IProjectCache>) {
    const logger = ProjectsCacheLogger;
    const cachePath = process.env.PROJECT_CACHE_PATH!;
    super(logger, jsonFileService, cachePath);
  }

  public getTotalPages(): number | null {
    return this._cache?.totalPages ?? null;
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
  protected override isCacheValid(cache: IProjectCache | null): boolean {
    return cache !== null && Object.keys(cache.cachePages).length > 0;
  }
}
