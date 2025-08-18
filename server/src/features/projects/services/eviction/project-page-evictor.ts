import { createJsonService, JsonService } from "@/services/json-file-service";
import {
  BaseStoreEvictor,
  IEvictionOptions,
} from "@/services/base-store.evictor";

import type { ProjectStoreModels } from "../../types/store";

export function createProjectPageEvictor(
  evictionOptions: IEvictionOptions
): ProjectPageEvictor {
  const jsonService = createJsonService<ProjectStoreModels.Page>(
    "ProjectStoreModels.Page"
  );
  const evictor = new ProjectPageEvictor(jsonService, evictionOptions);
  return evictor;
}

export class ProjectPageEvictor extends BaseStoreEvictor<ProjectStoreModels.Page> {
  public constructor(
    jsonService: JsonService<ProjectStoreModels.Page>,
    evictionOptions: IEvictionOptions
  ) {
    super(jsonService, evictionOptions);
  }
}
