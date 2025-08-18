import { createJsonService, JsonService } from "@/services";
import { ProjectPage } from "../../errors";
import { ProjectCacheService } from "./project-cache-service";

import type { ProjectStoreModels } from "../../types/store";

export function createProjectCachePageService() {
  const jsonFileServiceInstance = createJsonService<ProjectStoreModels.Store>(
    "ProjectStoreModels.Store"
  );
  return new ProjectCachePageService(jsonFileServiceInstance);
}

/**
 * @class ProjectCachePageService
 * @extends ProjectCacheService
 * @description Manages the caching of project page data, including reading from
 * and writing to JSON files, handling cache pages. This class ensures efficient
 * retrieval of project page data by utilizing an in-memory cache and persistent
 * JSON storage.
 */
export class ProjectCachePageService extends ProjectCacheService {
  /**
   * @constructor
   * @description
   * Calls the parent class constructor with the {@link JsonService}
   * instance.
   */
  public constructor(jsonFileService: JsonService<ProjectStoreModels.Store>) {
    super(jsonFileService);
  }
}
