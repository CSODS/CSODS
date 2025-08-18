import { fail, success } from "@/utils";
import { ProjectTag } from "../../errors";
import { createProjectTagCacheService, ProjectTagCacheService } from "../cache";

import type { ProjectTagsResult } from "../../types/result";
import type { ProjectTagStoreModels } from "../../types/store";
import type { ViewModels } from "../../types";

export function createProjectsTagCacheManager() {
  const cacheService = createProjectTagCacheService();
  return new ProjectTagsCacheManager(cacheService);
}

//  todo: add docs
export class ProjectTagsCacheManager {
  private readonly _cacheService: ProjectTagCacheService;

  public constructor(projectTagCacheService: ProjectTagCacheService) {
    this._cacheService = projectTagCacheService;
  }

  public async createAndStoreCache({
    devTypes,
    programmingLanguages,
    frameworks,
    databaseTechnologies,
    applicationIndustries,
  }: {
    devTypes: ViewModels.DevType[];
    programmingLanguages: ViewModels.ProgrammingLanguage[];
    frameworks: ViewModels.Framework[];
    databaseTechnologies: ViewModels.DatabaseTechnology[];
    applicationIndustries: ViewModels.ApplicationIndustry[];
  }): Promise<ProjectTagsResult> {
    const data: ProjectTagStoreModels.Store = {
      devTypes,
      programmingLanguages,
      frameworks,
      databaseTechnologies,
      applicationIndustries,
      createdOn: new Date(),
      lastAccessed: new Date(),
      viewCount: 0,
    };

    try {
      const storedCache = await this._cacheService.persistCache(data);
      return success(storedCache);
    } catch (err) {
      const error = new ProjectTag.ErrorClass({
        name: "CACHE_MANAGER_CREATE_NEW_ERROR",
        message: "Error creating project tags cache.",
        cause: err,
      });

      return fail(error);
    }
  }

  public async loadCache(): Promise<ProjectTagsResult> {
    try {
      const tags = await this._cacheService.loadCache();
      return success(tags, "JSON_CACHE");
    } catch (err) {
      const error = new ProjectTag.ErrorClass({
        name: "CACHE_MANAGER_LOAD_PRIMARY_ERROR",
        message: "Error loading tags from cache.",
        cause: err,
      });
      return fail(error);
    }
  }
}
