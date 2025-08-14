import { ResultFail, ResultSuccess } from "@/types";
import { fail, success } from "@/utils";
import { Project } from "../../errors";
import { ProjectDbFetcher } from "../project-db-fetcher.service";

import type { ProjectStoreModels } from "../../types/store";

export type ProjectsData = {
  totalPages: number;
  pageRecord: Record<number, ProjectStoreModels.ProjectDetails[]>;
};

export type FetchResult =
  | ResultSuccess<ProjectsData>
  | ResultFail<Project.ErrorClass>;

type FetchOptions = {
  includeCount?: boolean;
} & Parameters<ProjectDbFetcher["fetchProjectsPages"]>[0];

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
 * todo: log each retry
 */
export async function fetchProjectsData(
  projectDbFetchService: ProjectDbFetcher,
  fetchOptions: FetchOptions,
  retryOptions?: RetryOptions
): Promise<FetchResult> {
  const { includeCount, filter, pageSize } = fetchOptions;
  const { maxRetries = 1, retryDelayMs = 1000 } = retryOptions ?? {};

  for (let retry = 0; retry < maxRetries; retry++) {
    try {
      //  add a delay for retries
      const baseDelay = retryDelayMs;
      const jitter = Math.random() * 1000; // up to 1s jitter (configure as necessary)
      const delayMs = baseDelay * 2 ** (retry - 1) + jitter;
      if (retry > 0) await new Promise((r) => setTimeout(r, delayMs));

      let projectsCount = 0;

      if (includeCount) {
        projectsCount = await projectDbFetchService.fetchProjectsCount(filter);
        if (projectsCount === 0)
          throw new Project.ErrorClass({
            name: "DB_ACCESS_EMPTY_TABLE_ERROR",
            message: "The projects table is empty.",
          });
      }

      const totalPages = Math.ceil(projectsCount / pageSize);
      const pageRecord = await projectDbFetchService.fetchProjectsPages(
        fetchOptions
      );

      return success({ totalPages, pageRecord });
    } catch (err) {
      //  todo: log errors
      const error = Project.normalizeError({
        name: "DB_ACCESS_QUERY_ERROR",
        message: "Error fetching projects from database.",
        err,
      });

      if (error.name === "DB_ACCESS_EMPTY_TABLE_ERROR") return fail(error);
    }
  }

  const error = new Project.ErrorClass({
    name: "DB_ACCESS_EXCEEDED_MAX_FETCH_RETRIES_ERROR",
    message: "Exceeded retry limit without a successful fetch.",
  });

  return fail(error);
}
