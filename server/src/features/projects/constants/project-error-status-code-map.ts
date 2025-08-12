import { Exhaustive } from "@/types";
import { Project } from "../errors";
import { StatusCodeMap } from "@/data";

//  todo: add docs
export const ProjectErrorStatusCodeMap: Exhaustive<Project.ErrorName> = {
  ...StatusCodeMap.CacheError,
  ...StatusCodeMap.DbError,
  RETRIEVE_PROJECTS_ERROR: 500,
  RESOLVE_PROJECTS_ERROR: 500,
  STORE_CACHE_PAGE_ERROR: 500,
  MISSING_PROJECT_IN_PAGE_ERROR: 404,
  //  Inherited PageError types
  PAGE_OUT_OF_BOUNDS_ERROR: 404,
  MISSING_PAGE_ERROR: 404,
  PAGE_RETRIEVAL_ERROR: 500,
} as const;
