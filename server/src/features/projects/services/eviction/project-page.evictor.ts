import {
  createJsonService,
  JsonService,
  IEvictionOptions,
  BaseCacheEvictor,
} from "@services";
import { IProjectCachePage } from "../../types";

export function createProjectPageEvictor(
  evictionOptions: IEvictionOptions
): ProjectPageEvictor {
  const jsonFileHandler =
    createJsonService<IProjectCachePage>("IProjectCachePage");
  const evictor = new ProjectPageEvictor(jsonFileHandler, evictionOptions);
  return evictor;
}

export class ProjectPageEvictor extends BaseCacheEvictor<IProjectCachePage> {
  public constructor(
    jsonFileHandler: JsonService<IProjectCachePage>,
    evictionOptions: IEvictionOptions
  ) {
    super(jsonFileHandler, evictionOptions);
  }
}
