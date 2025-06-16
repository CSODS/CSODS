var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createContext } from '../../db/csods.js';
import ProjectRepository from '../../data/repositories/projectRepository.js';
import ProjectFrameworkRepository from '../../data/repositories/projectFrameworkRepository.js';
export function createProjectDataService() {
    return __awaiter(this, void 0, void 0, function* () {
        const dbContext = yield createContext();
        const projectRepoInstance = new ProjectRepository(dbContext);
        const projectFrameworkRepoInstance = new ProjectFrameworkRepository(dbContext);
        return new ProjectDataService(projectRepoInstance, projectFrameworkRepoInstance);
    });
}
/**
 * Service responsible for retrieving project data from the database via the `ProjectRepository`.
 * Provides utility methods for fetching individual or multiple pages of projects, as well as
 * querying the total count of available projects.
 */
export class ProjectDataService {
    /**
     * Constructs a new instance of `ProjectDataService`.
     *
     * @param {ProjectRepository} projectRepository - The repository instance used to fetch project data.
     */
    constructor(projectRepository, projectFrameworkRepository) {
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
    fetchProjectsPages(options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const pageStart = options.pageStart;
            const pageSize = options.pageSize;
            const pageEnd = (_a = options.pageEnd) !== null && _a !== void 0 ? _a : options.pageStart;
            const filter = options.filter;
            // Calculate the logical start and end row numbers for logging purposes, based on the page range and page size.
            const startRow = (pageStart - 1) * pageSize;
            const endRow = pageEnd * pageSize;
            console.log(`- Fetching rows ${startRow} to ${endRow}...
            - Paginated with page size: ${pageSize} from database...`);
            let projectDetails = {};
            for (let pageNumber = pageStart; pageNumber <= pageEnd; pageNumber++) {
                console.log(`Fetching page ${pageNumber} from database...`);
                const projectArr = yield this._projectRepo.getProjects(pageSize, pageNumber, filter);
                //  If no projects are returned for the current page, it signifies the end of available data,
                //  so stop fetching further pages.
                if (projectArr.length == 0)
                    break;
                //  Build project details for this page.
                projectDetails[pageNumber] = yield this.constructProjectDetails(projectArr);
                console.log(`Page ${pageNumber} fetched.`);
            }
            console.log(`Rows fetched from database.`);
            return projectDetails;
        });
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
    constructProjectDetails(projectArr) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(projectArr.map((project) => __awaiter(this, void 0, void 0, function* () {
                return ({
                    Project: project, // The core project data.
                    ProjectFrameworks: yield this._projectFrameworkRepo.FindManyByProjectId(project.ProjectId) // Associated frameworks.
                });
            })));
        });
    }
    /**
     * Retrieves the total number of project records available in the database.
     *
     * If a filter is provided, the count will reflect only the projects that match the specified criteria.
     *
     * @param filter - Optional filter to apply (e.g., by language, dev type, etc.).
     * @returns A promise that resolves to the count of matching project records.
     */
    fetchProjectsCount(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._projectRepo.countProjects(filter);
        });
    }
}
