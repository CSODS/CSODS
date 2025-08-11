import {
  AbstractCacheService,
  createJsonFileService,
  JsonFileService,
} from "@/services";
import { ProjectsCacheLogger } from "@/utils";
import { IProjectTagsCache } from "../../types";

export function createProjectTagCacheService() {
  const jsonFileService =
    createJsonFileService<IProjectTagsCache>("IProjectTagsCache");
  return new ProjectTagCacheService(jsonFileService);
}

/**
 * todo: add docs
 */
export class ProjectTagCacheService extends AbstractCacheService<IProjectTagsCache> {
  protected override _filename: string = "TAG_CACHE";

  public constructor(jsonFileService: JsonFileService<IProjectTagsCache>) {
    const logger = ProjectsCacheLogger;
    const cachePath = process.env.TAGS_CACHE_PATH!;
    super(logger, jsonFileService, cachePath);
  }
}
