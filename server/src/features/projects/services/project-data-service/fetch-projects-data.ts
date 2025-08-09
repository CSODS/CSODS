import { ProjectFilter } from "../../types";
import { ProjectDbFetchService } from "../project-db-fetch.service";
import { ProjectError } from "./project-data-service.error";

type FetchOptions = Parameters<ProjectDbFetchService["fetchProjectsPages"]>[0];

/**
 * @description Asynchronously fetches the a paginated record of projects and
 * the total count of projects from the database.
 * @param projectDbFetchService The service dependency for database communication.
 * @param fetchOptions.filter An optional filter object for narrowing down database
 * queries.
 * @param fetchOptions.pageSize Specifies
 * @returns
 * - `totalPages` - The total pages of the paginated projects.
 * - `pageRecord` - A record containing each page of t
 * @throws {ProjectError} Thrown with `name: "DB_FETCH_ERROR"` if there are no
 * projects in the database..
 * todo: update docs
 */
export async function fetchProjectsData(
  projectDbFetchService: ProjectDbFetchService,
  fetchOptions: FetchOptions
) {
  const { filter, pageSize } = fetchOptions;

  const projectsCount = await projectDbFetchService.fetchProjectsCount(filter);
  if (projectsCount === 0)
    throw new ProjectError({
      name: "DB_FETCH_ERROR",
      message: "Project list is empty.",
    });

  const totalPages = Math.ceil(projectsCount / pageSize);
  const pageRecord = await projectDbFetchService.fetchProjectsPages(
    fetchOptions
  );

  return { totalPages, pageRecord };
}
