import { StatusCodeMap as BaseMap } from "@/data";
import { Exhaustive } from "@/types";
import { Project, ProjectPage, ProjectTag } from "../errors";

//  todo: add docs
export namespace StatusCodeMap {
  export const ProjectPageError: Exhaustive<ProjectPage.ErrorName> = {
    PAGE_OUT_OF_BOUNDS_ERROR: 404,
    MISSING_PAGE_ERROR: 404,
    PAGE_RETRIEVAL_ERROR: 500,
  } as const;

  export const ProjectError: Exhaustive<Project.ErrorName> = {
    ...BaseMap.CacheManagerError,
    ...BaseMap.DbError,
    ...ProjectPageError,
    RETRIEVE_PROJECTS_ERROR: 500,
    RESOLVE_PROJECTS_ERROR: 500,
    STORE_CACHE_PAGE_ERROR: 500,
    MISSING_PROJECT_IN_PAGE_ERROR: 404,
  } as const;

  export const ProjectTagsError: Exhaustive<ProjectTag.ErrorName> = {
    ...BaseMap.CacheManagerError,
    ...BaseMap.DbError,
    RETRIEVE_TAGS_ERROR: 500,
    RESOLVE_TAGS_ERROR: 500,
  } as const;
}
