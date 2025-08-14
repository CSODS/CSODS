import { fail } from "@/utils";
import { ProjectTag } from "../../errors";
import * as DbFetcher from "../project-tags-db-fetcher.service";
import { fetchProjectTagsData } from "./fetch-project-tags-data";
import * as CacheManager from "./project-tags-cache-manager";

import type { ProjectTagsResult } from "../../types/result";

export async function createProjectTagsDataService() {
  const cacheManager = CacheManager.createProjectsTagCacheManager();
  const dbFetcher = await DbFetcher.createProjectTagsDbFetcher();
  return new ProjectTagsDataService(cacheManager, dbFetcher);
}

export class ProjectTagsDataService {
  private readonly _cacheManager: CacheManager.ProjectTagsCacheManager;
  private readonly _dbFetcher: DbFetcher.ProjectTagsDbFetcher;

  public constructor(
    projectTagsCacheManager: CacheManager.ProjectTagsCacheManager,
    projectTagsDbFetcher: DbFetcher.ProjectTagsDbFetcher
  ) {
    this._cacheManager = projectTagsCacheManager;
    this._dbFetcher = projectTagsDbFetcher;
  }

  //  todo: add docs
  public async getProjectTags() {
    return await this.resolveProjectTags();
  }

  //  todo: add docs
  private async resolveProjectTags(): Promise<ProjectTagsResult> {
    const loadResult = await this._cacheManager.loadCache();
    if (loadResult.success) return loadResult;

    const fetchResult = await fetchProjectTagsData(this._dbFetcher);
    if (!fetchResult.success) return fetchResult; // fetch failed; return result

    for (let i = 0; i < 3; i++) {
      const createResult = await this._cacheManager.createAndStoreCache({
        ...fetchResult.result,
      });

      if (createResult.success) return { ...createResult, source: "DATABASE" };
    }

    const error = new ProjectTag.ErrorClass({
      name: "RESOLVE_TAGS_ERROR",
      message: "Failed all attempts to crate tags cache.",
    });

    return fail(error);
  }
}
