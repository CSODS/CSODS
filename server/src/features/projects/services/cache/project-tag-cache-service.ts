import {
  AbstractCacheService,
  createJsonFileService,
  JsonFileService,
} from "@/services";
import { ProjectsCacheLogger } from "@/utils";
import { ProjectTags } from "../../types";

export function createProjectTagCacheService() {
  const jsonFileService =
    createJsonFileService<ProjectTags.Store>("ProjectTags.Store");
  return new ProjectTagCacheService(jsonFileService);
}

/**
 * todo: add docs
 */
export class ProjectTagCacheService extends AbstractCacheService<ProjectTags.Store> {
  protected override _filename: string = "TAG_CACHE";

  public constructor(jsonFileService: JsonFileService<ProjectTags.Store>) {
    const logger = ProjectsCacheLogger;
    const cachePath = process.env.TAGS_CACHE_PATH!;
    super(logger, jsonFileService, cachePath);
  }
}
