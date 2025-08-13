import {
  AbstractCacheService,
  createJsonFileService,
  JsonFileService,
} from "@/services";
import { ProjectsCacheLogger } from "@/utils";

import type { ProjectTagStoreModels } from "../../types/store";

export function createProjectTagCacheService() {
  const jsonFileService = createJsonFileService<ProjectTagStoreModels.Store>(
    "ProjectTagStoreModels.Store"
  );
  return new ProjectTagCacheService(jsonFileService);
}

/**
 * todo: add docs
 */
export class ProjectTagCacheService extends AbstractCacheService<ProjectTagStoreModels.Store> {
  protected override _filename: string = "TAG_CACHE";

  public constructor(
    jsonFileService: JsonFileService<ProjectTagStoreModels.Store>
  ) {
    const logger = ProjectsCacheLogger;
    const cachePath = process.env.TAGS_CACHE_PATH!;
    super(logger, jsonFileService, cachePath);
  }
}
