import { createJsonFileService, JsonFileService } from "@services";
import { IProjectCachePage } from "@viewmodels";
import { IEvictionOptions, BaseCacheEvictor } from "../base-cache.evictor";

export function createProjectPageEvictor(
  evictionOptions: IEvictionOptions
): ProjectPageEvictor {
  const jsonFileHandler =
    createJsonFileService<IProjectCachePage>("IProjectCachePage");
  const evictor = new ProjectPageEvictor(jsonFileHandler, evictionOptions);
  return evictor;
}

export class ProjectPageEvictor extends BaseCacheEvictor<IProjectCachePage> {
  public constructor(
    jsonFileHandler: JsonFileService<IProjectCachePage>,
    evictionOptions: IEvictionOptions
  ) {
    super(jsonFileHandler, evictionOptions);
  }
}
