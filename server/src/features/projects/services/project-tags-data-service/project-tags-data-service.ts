import { fail } from "@/utils";
import { ProjectTagError } from "../../errors";
import { ProjectTagsResult } from "../../types";
import { ProjectTagsDbFetcher } from "../project-tags-db-fetcher.service";
import { fetchProjectTagsData } from "./fetch-project-tags-data";
import { ProjectTagsCacheManager } from "./project-tags-cache-manager";

export class ProjectTagsDataService {
  private readonly _cacheManager: ProjectTagsCacheManager;
  private readonly _dbFetcher: ProjectTagsDbFetcher;

  public constructor(
    projectTagsCacheManager: ProjectTagsCacheManager,
    projectTagsDbFetcher: ProjectTagsDbFetcher
  ) {
    this._cacheManager = projectTagsCacheManager;
    this._dbFetcher = projectTagsDbFetcher;
  }

  public async resolveProjectTags(): Promise<ProjectTagsResult> {
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

    const error = new ProjectTagError.ProjectTagError({
      name: "RESOLVE_TAGS_ERROR",
      message: "Failed all attempts to crate tags cache.",
    });

    return fail(error);
  }
}
