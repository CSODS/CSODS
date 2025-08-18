import {
  createJsonService,
  JsonService,
  IEvictionOptions,
  BaseStoreEvictor,
} from "@services";
import { IProjectCachePage } from "../../types";

export function createLegacyProjectPageEvictor(
  evictionOptions: IEvictionOptions
): LegacyProjectPageEvictor {
  const jsonFileHandler =
    createJsonService<IProjectCachePage>("IProjectCachePage");
  const evictor = new LegacyProjectPageEvictor(
    jsonFileHandler,
    evictionOptions
  );
  return evictor;
}

export class LegacyProjectPageEvictor extends BaseStoreEvictor<IProjectCachePage> {
  public constructor(
    jsonFileHandler: JsonService<IProjectCachePage>,
    evictionOptions: IEvictionOptions
  ) {
    super(jsonFileHandler, evictionOptions);
  }
}
