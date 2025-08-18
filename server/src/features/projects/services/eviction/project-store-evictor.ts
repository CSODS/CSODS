import {
  JsonService,
  createJsonService,
  IFile,
  IEvictionOptions,
  BaseCacheEvictor,
} from "@services";
import {
  createProjectPageEvictor,
  ProjectPageEvictor,
} from "./project-page-evictor";

import type { ProjectStoreModels } from "../../types/store";

export function createProjectCacheEvictor(
  cacheEvictionOptions?: IEvictionOptions,
  pageEvictionOptions?: IEvictionOptions
): ProjectStoreEvictor {
  const defaultCacheEvictionOptions: IEvictionOptions = {
    Strategy: "ttl",
    Duration: 1000 * 60 * 60 * 24 * 1,
  };

  const defaultPageEvictionOptions: IEvictionOptions = {
    Strategy: "ttl+lfu",
    Duration: 1000 * 60 * 60 * 3,
    Granularity: 1000 * 60 * 60,
    ViewThreshold: 10,
  };
  const jsonFileHandler = createJsonService<ProjectStoreModels.Store>(
    "ProjectStoreModels.Store"
  );
  const pageEvictorInstance = createProjectPageEvictor(
    pageEvictionOptions ?? defaultPageEvictionOptions
  );
  const cacheEvictorInstance = new ProjectStoreEvictor(
    jsonFileHandler,
    cacheEvictionOptions ?? defaultCacheEvictionOptions,
    pageEvictorInstance
  );
  return cacheEvictorInstance;
}

export class ProjectStoreEvictor extends BaseCacheEvictor<ProjectStoreModels.Store> {
  private readonly _projectPageEvictor: ProjectPageEvictor;
  private readonly _cacheDirectory = process.env.PROJECT_CACHE_PATH!;

  public constructor(
    jsonFileHandler: JsonService<ProjectStoreModels.Store>,
    evictionOptions: IEvictionOptions,
    projectPageEvictor: ProjectPageEvictor
  ) {
    super(jsonFileHandler, evictionOptions);
    this._projectPageEvictor = projectPageEvictor;
  }

  /**
   * @public
   *
   * @description
   * Scans the project cache directory and attempts to evict cache files
   * that meet the given eviction criteria.
   * If `excludeNoFilter` is set to true, excludes files whose names contain `'nofilter'`.
   *
   * @param {IEvictionOptions} [evictionOptions] - Optional strategy options that define eviction behavior (e.g., based on age, access frequency, etc.).
   * @param {{ excludeNoFilter?: boolean }} [IEvictionFilter] - Optional filter settings.
   * @param {boolean} [IEvictionFilter.excludeNoFilter=false] - If `true`, excludes files whose names contain `'nofilter'`.
   *
   * @returns {Promise<number>} - A promise that resolves to the number of cache files evicted.
   */
  public async evictStaleCache(
    evictionOptions?: IEvictionOptions,
    { excludeNoFilter = false }: IEvictionFilter = {}
  ): Promise<number> {
    const filterFunc = (filename: string) => {
      if (excludeNoFilter) {
        return !filename.includes("nofilter");
      }
      return true;
    };

    let evictionCount = 0;

    await this._jsonFileHandler.processFiles(
      this._cacheDirectory,
      async (file) => {
        try {
          const isEvicted = await this.tryEvict(file, evictionOptions);

          evictionCount++;
        } catch {
          //  todo: log or something
        }
      },
      filterFunc
    );
    return evictionCount;
  }
  /**
   * @public
   *
   * @description
   * Scans the project cache directory and evicts individual stale cache pages
   * within each cache file based on the given eviction options.
   *
   * @param {IEvictionOptions} [evictionOptions] - Optional eviction strategy options.
   *
   * @returns {Promise<number>} - A promise that resolves to the total number of cache pages evicted.
   */
  public async evictPagesFromCaches(
    evictionOptions?: IEvictionOptions
  ): Promise<number> {
    let totalEvictedPages = 0;

    await this._jsonFileHandler.processFiles(
      this._cacheDirectory,
      async (file) => {
        const evictedPages = await this.evictStaleCachePages(
          file,
          evictionOptions
        );
        totalEvictedPages += evictedPages;
      }
    );
    return totalEvictedPages;
  }
  /**
   * @private
   *
   * @description
   * Evicts stale pages from the projects cache.
   *
   * Parses an `IProjectsCache` file first. If it has pages, iterates through all pages and
   * tries each for eviction.
   *
   * @param {IFile} file - The file to parse and evict pages from.
   * @param {IEvictionOptions} [evictionOptions] - Optional eviction strategy options (e.g., TTL, LFU).
   *
   * @returns {Promise<number>} - A promise that resolves to the number of cache pages evicted from the file.
   */
  private async evictStaleCachePages(
    file: IFile,
    evictionOptions?: IEvictionOptions
  ): Promise<number> {
    let evictedPages = 0;

    const data = await this.readFile(file);

    const pageRecord: ProjectStoreModels.PageRecord = data?.pages ?? {};

    const pageEntries = Object.entries(pageRecord);

    const hasPages = pageEntries.length > 0;

    if (!hasPages) {
      return 0;
    }

    for (const pageEntry of pageEntries) {
      const pageNumber = Number(pageEntry[0]);
      const page = pageEntry[1];
      const isEvictPage = await this._projectPageEvictor.isEvict(
        page,
        evictionOptions
      );
      if (isEvictPage) {
        delete pageRecord[pageNumber];
        evictedPages++;
      }
    }

    try {
      await this._jsonFileHandler.writeToJsonFile(
        file.Filepath,
        file.Filename,
        data
      );
      return evictedPages;
    } catch (err) {
      return 0;
    }
  }
}
/**
 * @interface IEvictionFilter
 * @description
 * Defines filters for project cache eviction.
 */
interface IEvictionFilter {
  /**
   * Set to true if 'nofilter' cache should be excluded from eviction.
   */
  excludeNoFilter?: boolean;
}
