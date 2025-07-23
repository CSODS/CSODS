import { createContext } from "@/db/csods";
import { ProjectViewModel, IProjectDetails } from "@viewmodels";
import {
  ProjectRepository,
  IProjectFilter,
  ProjectFrameworkRepository,
} from "@services";
import { DbLogger } from "@/utils";

export async function createProjectDataService() {
  const dbContext = await createContext();
  const projectRepoInstance = new ProjectRepository(dbContext);
  const projectFrameworkRepoInstance = new ProjectFrameworkRepository(
    dbContext
  );
  return new ProjectDataService(
    projectRepoInstance,
    projectFrameworkRepoInstance
  );
}

/**
 * Service responsible for retrieving project data from the database via the `ProjectRepository`.
 * Provides utility methods for fetching individual or multiple pages of projects, as well as
 * querying the total count of available projects.
 */
export class ProjectDataService {
  private readonly _projectRepo: ProjectRepository;
  private readonly _projectFrameworkRepo: ProjectFrameworkRepository;

  /**
   * Constructs a new instance of `ProjectDataService`.
   *
   * @param {ProjectRepository} projectRepository - The repository instance used to fetch project data.
   */
  public constructor(
    projectRepository: ProjectRepository,
    projectFrameworkRepository: ProjectFrameworkRepository
  ) {
    this._projectRepo = projectRepository;
    this._projectFrameworkRepo = projectFrameworkRepository;
  }

  /**
   * Fetches one or more pages of project data from the database and organizes the results into a page-number-keyed object.
   *
   * Each page consists of a list of `IProjectDetails` entries, combining the core project data (`Project`)
   * with its associated frameworks (`ProjectFrameworks`). Pages are retrieved in ascending order starting from `pageStart`.
   *
   * The operation stops early if an empty page is returned — this is treated as an indicator that there are no more
   * projects beyond that point in the database.
   *
   * ### Behavior:
   * - Pages are 1-indexed.
   * - If `pageEnd` is not provided, only the `pageStart` page is fetched.
   * - If filters are provided, the results will be limited accordingly.
   *
   * @param options An object containing:
   * - `pageStart` (number): The first page to fetch (inclusive, 1-indexed).
   * - `pageSize` (number): The number of projects per page.
   * - `pageEnd` (number, optional): The last page to fetch (inclusive). Defaults to `pageStart`.
   * - `isAscending (boolean, optional): Specifies the sorting order of the data before fetching.
   * - `filter` (IProjectFilter, optional): A filter to apply to the query (e.g., by language, type, etc.).
   *
   * @returns A promise resolving to a `Record<number, IProjectDetails[]>`, where each key is a page number
   * and each value is an array of fully-hydrated `IProjectDetails` entries (project + frameworks).
   *
   * @example
   * const result = await fetchProjectsPages({
   *   pageStart: 1,
   *   pageSize: 10,
   *   pageEnd: 3,
   *   filter: { LanguageId: 2 }
   * });
   *
   * // result might look like:
   * // {
   * //   1: [{ Project: ..., ProjectFrameworks: [...] }, ...],
   * //   2: [...],
   * //   3: [...]
   * // }
   */
  public async fetchProjectsPages(options: {
    pageStart: number;
    pageSize: number;
    pageEnd?: number;
    isAscending?: boolean;
    filter?: IProjectFilter;
  }): Promise<Record<number, IProjectDetails[]>> {
    const pageStart = options.pageStart;
    const pageSize = options.pageSize;
    const pageEnd = options.pageEnd ?? options.pageStart;
    const isAscending = options.isAscending ?? true;
    const filter = options.filter;

    // Calculate the logical start and end row numbers for logging purposes, based on the page range and page size.
    const startRow = (pageStart - 1) * pageSize;
    const endRow = pageEnd * pageSize;

    DbLogger.info(
      `[Projects] Fetching pages ${pageStart} to ${pageEnd} with size ${pageSize} from database.`
    );
    let projectDetails: Record<number, IProjectDetails[]> = {};

    for (let pageNumber = pageStart; pageNumber <= pageEnd; pageNumber++) {
      DbLogger.info(`[Projects] Fetching page ${pageNumber}...`);
      const projectArr: ProjectViewModel[] =
        await this._projectRepo.getProjects({
          isAscending: isAscending,
          filter: filter,
          pageSize: pageSize,
          pageNumber: pageNumber,
        });

      //  If no projects are returned for the current page, it signifies the end of available data,
      //  so stop fetching further pages.
      if (projectArr.length == 0) {
        DbLogger.info(
          `[Projects] No rows found at page ${pageNumber}. Ending fetch...`
        );
        break;
      }

      //  Build project details for this page.
      projectDetails[pageNumber] = await this.constructProjectDetails(
        projectArr
      );
    }
    DbLogger.info(`[Projects] Finished fetching pages.`);
    return projectDetails;
  }
  /**
   * Constructs an array of `IProjectDetails` objects from the given list of `Project` entities.
   *
   * For each project, this method fetches its associated frameworks asynchronously and
   * combines them into a single `IProjectDetails` object.
   *
   * @param projectArr An array of `Project` entities for which to fetch associated frameworks.
   * @returns A promise resolving to an array of fully-hydrated `IProjectDetails` objects,
   * where each entry contains the project and its associated frameworks.
   *
   * @example
   * const details = await constructProjectDetails(projects);
   * // details: [{ Project: ..., ProjectFrameworks: [...] }, ...]
   */
  private async constructProjectDetails(
    projectArr: ProjectViewModel[]
  ): Promise<IProjectDetails[]> {
    return await Promise.all(
      projectArr.map(async (project) => ({
        Project: project, // The core project data.
        ProjectFrameworks: await this._projectFrameworkRepo.FindManyByProjectId(
          project.projectId
        ), // Associated frameworks.
      }))
    );
  }

  /**
   * Retrieves the total number of project records available in the database.
   *
   * If a filter is provided, the count will reflect only the projects that match the specified criteria.
   *
   * @param filter - Optional filter to apply (e.g., by language, dev type, etc.).
   * @returns A promise that resolves to the count of matching project records.
   */
  public async fetchProjectsCount(filter?: IProjectFilter): Promise<number> {
    return await this._projectRepo.countProjects(filter);
  }
}
