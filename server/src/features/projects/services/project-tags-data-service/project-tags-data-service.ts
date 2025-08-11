import { ProjectTagCacheManager } from "./project-tag-cache-manager";

export class ProjectTagsDataService {
  private readonly _cacheManager: ProjectTagCacheManager;

  public constructor(projectTagCacheManager: ProjectTagCacheManager) {
    this._cacheManager = projectTagCacheManager;
  }

  public async resolveProjectTags() {
    const loadResult = await this._cacheManager.loadCache();
    if (loadResult.success) return loadResult;

    const fetchResult = {};
  }
}
