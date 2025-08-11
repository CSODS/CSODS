import { ProjectTagsCacheManager } from "./project-tags-cache-manager";

export class ProjectTagsDataService {
  private readonly _cacheManager: ProjectTagsCacheManager;

  public constructor(projectTagCacheManager: ProjectTagsCacheManager) {
    this._cacheManager = projectTagCacheManager;
  }

  public async resolveProjectTags() {
    const loadResult = await this._cacheManager.loadCache();
    if (loadResult.success) return loadResult;

    const fetchResult = {};
  }
}
