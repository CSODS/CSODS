import { createJsonService, JsonService } from "@/services/json-file-service";
import {
  BaseCacheEvictor,
  IEvictionOptions,
} from "@/services/base-cache.evictor";

import type { ProjectStoreModels } from "../../types/store";

export function createProjectPageEvictor(
  evictionOptions: IEvictionOptions
): ProjectPageEvictor {
  const jsonFileHandler = createJsonService<ProjectStoreModels.Page>(
    "ProjectStoreModels.Page"
  );
  const evictor = new ProjectPageEvictor(jsonFileHandler, evictionOptions);
  return evictor;
}

export class ProjectPageEvictor extends BaseCacheEvictor<ProjectStoreModels.Page> {
  public constructor(
    jsonFileHandler: JsonService<ProjectStoreModels.Page>,
    evictionOptions: IEvictionOptions
  ) {
    super(jsonFileHandler, evictionOptions);
  }
}
