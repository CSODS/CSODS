import { Exhaustive } from "@/types";
import { ProjectTag } from "../errors";
import { StatusCodeMap } from "@/data";

//  todo: add docs
export const ProjectTagsErrorStatusCodeMap: Exhaustive<ProjectTag.ErrorName> = {
  ...StatusCodeMap.CacheError,
  ...StatusCodeMap.DbError,
  RETRIEVE_TAGS_ERROR: 500,
  RESOLVE_TAGS_ERROR: 500,
} as const;
