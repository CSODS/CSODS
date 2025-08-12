import { fail, success } from "@/utils";
import { createProjectTagCacheService, ProjectTagCacheService } from "../cache";
import { ProjectTagError } from "../../errors";
import { ProjectTags, ProjectTagsResult } from "../../types";
import { ViewModels } from "../../types";

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
    devTypes: ViewModels.DevTypeViewModel[];
    programmingLanguages: ViewModels.ProgrammingLanguageViewModel[];
    frameworks: ViewModels.FrameworkViewModel[];
    databaseTechnologies: ViewModels.DatabaseTechnologyViewModel[];
    applicationIndustries: ViewModels.ApplicationIndustryViewModel[];
  }): Promise<ProjectTagsResult> {
    const data: ProjectTags.Store = {
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
      const error = new ProjectTagError.ProjectTagError({
        name: "CREATE_NEW_CACHE_ERROR",
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
      const error = new ProjectTagError.ProjectTagError({
        name: "LOAD_FROM_CACHE_ERROR",
        message: "Error loading tags from cache.",
        cause: err,
      });
      return fail(error);
    }
  }
}
