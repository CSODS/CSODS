import {
  JsonService,
  createJsonService,
  IFile,
  IEvictionOptions,
  BaseStoreEvictor,
} from "@services";
import {
  createProjectPageEvictor,
  ProjectPageEvictor,
} from "./project-page-evictor";

import type { ProjectStoreModels } from "../../types/store";

export function createProjectStoreEvictor(
  storeEvictionOptions?: IEvictionOptions,
  pageEvictionOptions?: IEvictionOptions
): ProjectStoreEvictor {
  const defaultStoreEvictionOptions: IEvictionOptions = {
    Strategy: "ttl",
    Duration: 1000 * 60 * 60 * 24 * 1,
  };

  const defaultPageEvictionOptions: IEvictionOptions = {
    Strategy: "ttl+lfu",
    Duration: 1000 * 60 * 60 * 3,
    Granularity: 1000 * 60 * 60,
    ViewThreshold: 10,
  };
  const jsonService = createJsonService<ProjectStoreModels.Store>(
    "ProjectStoreModels.Store"
  );
  const pageEvictorInstance = createProjectPageEvictor(
    pageEvictionOptions ?? defaultPageEvictionOptions
  );
  const storeEvictorInstance = new ProjectStoreEvictor(
    jsonService,
    storeEvictionOptions ?? defaultStoreEvictionOptions,
    pageEvictorInstance
  );
  return storeEvictorInstance;
}

export class ProjectStoreEvictor extends BaseStoreEvictor<ProjectStoreModels.Store> {
  private readonly _projectPageEvictor: ProjectPageEvictor;
  private readonly _jsonDirectory = process.env.PROJECT_CACHE_PATH!;

  public constructor(
    jsonService: JsonService<ProjectStoreModels.Store>,
    evictionOptions: IEvictionOptions,
    projectPageEvictor: ProjectPageEvictor
  ) {
    super(jsonService, evictionOptions);
    this._projectPageEvictor = projectPageEvictor;
  }

  /**
   * @public
   *
   * @description
   * Scans the project store directory and attempts to evict store files
   * that meet the given eviction criteria.
   * If `excludeNoFilter` is set to true, excludes files whose names contain `'nofilter'`.
   *
   * @param {IEvictionOptions} [evictionOptions] - Optional strategy options that define eviction behavior (e.g., based on age, access frequency, etc.).
   * @param {{ excludeNoFilter?: boolean }} [IEvictionFilter] - Optional filter settings.
   * @param {boolean} [IEvictionFilter.excludeNoFilter=false] - If `true`, excludes files whose names contain `'nofilter'`.
   *
   * @returns {Promise<number>} - A promise that resolves to the number of store files evicted.
   */
  public async evictStaleStore(
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

    await this._jsonService.processFiles(
      this._jsonDirectory,
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
   * Scans the project store directory and evicts individual stale store pages
   * within each store file based on the given eviction options.
   *
   * @param {IEvictionOptions} [evictionOptions] - Optional eviction strategy options.
   *
   * @returns {Promise<number>} - A promise that resolves to the total number of store pages evicted.
   */
  public async evictPagesFromStores(
    evictionOptions?: IEvictionOptions
  ): Promise<number> {
    let totalEvictedPages = 0;

    await this._jsonService.processFiles(this._jsonDirectory, async (file) => {
      const evictedPages = await this.evictStaleStorePages(
        file,
        evictionOptions
      );
      totalEvictedPages += evictedPages;
    });
    return totalEvictedPages;
  }
  /**
   * @private
   *
   * @description
   * Evicts stale pages from the projects store.
   *
   * Parses an `ProjectStoreModels.Store` file first. If it has pages, iterates through all pages and
   * tries each for eviction.
   *
   * @param {IFile} file - The file to parse and evict pages from.
   * @param {IEvictionOptions} [evictionOptions] - Optional eviction strategy options (e.g., TTL, LFU).
   *
   * @returns {Promise<number>} - A promise that resolves to the number of store pages evicted from the file.
   */
  private async evictStaleStorePages(
    file: IFile,
    evictionOptions?: IEvictionOptions
  ): Promise<number> {
    let evictedPages = 0;

    const data = await this.parseStore(file);

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
      await this._jsonService.writeToJsonFile(
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
 * Defines filters for project store eviction.
 */
interface IEvictionFilter {
  /**
   * Set to true if 'nofilter' store should be excluded from eviction.
   */
  excludeNoFilter?: boolean;
}
