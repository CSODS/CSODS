import { ResultFail, ResultSuccess } from "@/types";
import { IProjectDetails, ProjectFilter } from "../../types";
import { ProjectDbFetchService } from "../project-db-fetch.service";
import {
  normalizeProjectError,
  ProjectError,
} from "./project-data-service.error";
import { fail, success } from "@/utils";

export type ProjectsData = {
  totalPages: number;
  pageRecord: Record<number, IProjectDetails[]>;
};

export type FetchResult =
  | ResultSuccess<ProjectsData>
  | ResultFail<ProjectError>;

type FetchOptions = Parameters<ProjectDbFetchService["fetchProjectsPages"]>[0];
type RetryOptions = {
  maxRetries?: number;
  retryDelayMs?: number;
};

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
 * todo: add retry jitter
 * todo: exponential delay
 * todo: log each retry
 */
export async function fetchProjectsData(
  projectDbFetchService: ProjectDbFetchService,
  fetchOptions: FetchOptions,
  retryOptions?: RetryOptions
): Promise<FetchResult> {
  const { filter, pageSize } = fetchOptions;
  const { maxRetries = 1, retryDelayMs = 1500 } = retryOptions ?? {};

  for (let retry = 0; retry < maxRetries; retry++) {
    try {
      //  add a delay for retries
      if (retry > 0) await new Promise((r) => setTimeout(r, retryDelayMs));

      const projectsCount = await projectDbFetchService.fetchProjectsCount(
        filter
      );
      if (projectsCount === 0)
        throw new ProjectError({
          name: "EMPTY_PROJECTS_TABLE_ERROR",
          message: "The projects table is empty.",
        });

      const totalPages = Math.ceil(projectsCount / pageSize);
      const pageRecord = await projectDbFetchService.fetchProjectsPages(
        fetchOptions
      );

      return success({ totalPages, pageRecord });
    } catch (err) {
      //  todo: log errors
      const error = normalizeProjectError({
        name: "DB_FETCH_ERROR",
        message: "Error fetching projects from database.",
        err,
      });

      if (error.name === "EMPTY_PROJECTS_TABLE_ERROR") return fail(error);
    }
  }

  const error = new ProjectError({
    name: "EXCEEDED_MAX_FETCH_RETRIES_ERROR",
    message: "Exceeded retry limit without a successful fetch.",
  });

  return fail(error);
}
