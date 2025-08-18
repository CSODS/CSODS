import { StatusCodeMap as BaseMap } from "@/data";
import { Exhaustive } from "@/types";
import { Project, ProjectPage, ProjectTag } from "../errors";

/**
 * @description A namespace containing maps for Response Status Codes and their
 * corresponding status codes.
 *
 * Used in controllers.
 *
 * @remarks Some Error Classes inherit type literals from {@link BaseMap}, as denoted
 * by the spread syntax in some StatusCodeMaps.
 */
export namespace StatusCodeMap {
  /**
   * @description A map for Status Codes that correspond to a specific
   * `ProjectPage` Error type literal.
   */
  export const ProjectPageError: Exhaustive<ProjectPage.ErrorName> = {
    /**
     * Thrown when the page requested is `0` or goes past the total pages available
     * in the database.
     */
    PAGE_OUT_OF_BOUNDS_ERROR: 404,
    /**
     * Thrown when the page requested is not in the `Store` object.
     */
    MISSING_PAGE_ERROR: 404,
    /**
     * Thrown when the request for a page in the `Store` fails.
     */
    PAGE_RETRIEVAL_ERROR: 500,
  } as const;
  /**
   * @description A map for Status Codes that correspond to a specific `Project` Error
   * type literal.
   */
  export const ProjectError: Exhaustive<Project.ErrorName> = {
    ...BaseMap.CacheManagerError,
    ...BaseMap.DbError,
    ...ProjectPageError,
    /**
     * Thrown when the request for retrieving a `Store` object for the
     * Projects feature fails.
     */
    RETRIEVE_PROJECTS_ERROR: 500,
    /**
     * Thrown when all attempts to resolve a projects `Store` object
     * (parsing, creating, backups) fail.
     */
    RESOLVE_PROJECTS_ERROR: 500,
    /**
     * todo: move this to `ProjectPage` status code map.
     * Thrown when storing a page in the projects `Store` fails.
     */
    STORE_CACHE_PAGE_ERROR: 500,
    /**
     * todo: move this to `ProjectPage` status code map.
     * Thrown when the requested project is missing in the specified page.
     */
    MISSING_PROJECT_IN_PAGE_ERROR: 404,
  } as const;
  /**
   * @description A map for Status Codes that correspond to a specific `ProjectTags`
   * Error type literal.
   */
  export const ProjectTagsError: Exhaustive<ProjectTag.ErrorName> = {
    ...BaseMap.CacheManagerError,
    ...BaseMap.DbError,
    /**
     * Thrown when retrieving the Project Tags `Store` object fails.
     */
    RETRIEVE_TAGS_ERROR: 500,
    /**
     * Thrown when all attempts to resolve the `Store` object fails
     * (parsing, creation and persistence, backups).
     */
    RESOLVE_TAGS_ERROR: 500,
  } as const;
}
