import { createContext } from '../../db/csods.js'; 
import { Projects, ProjectFrameworks } from '../../db/schema.js';
import { Project, ProjectFramework } from '../../viewmodels/dbModels.js';
import { IProjectDetails } from '../../viewmodels/cache/cacheInterfaces.js';
import ProjectRepository from '../../data/repositories/projectRepository.js';
import ProjectFrameworkRepository from '../../data/repositories/projectFrameworkRepository.js';

export async function createProjectDataService() {
    const dbContext = await createContext();
    const projectRepoInstance = new ProjectRepository(dbContext);
    const projectFrameworkRepoInstance = new ProjectFrameworkRepository(dbContext);
    return new ProjectDataService(projectRepoInstance, projectFrameworkRepoInstance);
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
    ) 
    {
        this._projectRepo = projectRepository;
        this._projectFrameworkRepo = projectFrameworkRepository;
    }

    /**
     * Fetches a range of project pages from the database and organizes them into a page-number-keyed record.
     *
     * Each entry in the returned record corresponds to a page number and contains an array of `IProjectDetails` objects.
     * `IProjectDetails` encapsulates both the primary project information (`Project`) and its associated frameworks (`ProjectFrameworks`).
     * Pages are fetched sequentially based on the `pageSize` parameter.
     * If an empty page (meaning no projects are returned for that page number) is encountered during the iteration,
     * the fetching process is stopped early, assuming no further projects exist beyond that point.
     *
     * @param {number} pageStart - The starting page number for the fetch operation (inclusive, 1-indexed).
     * @param {number} pageSize - The maximum number of projects to include on each page.
     * @param {number} [pageEnd=pageStart] - The ending page number for the fetch operation (inclusive). Defaults to `pageStart` if not provided,
     * meaning only a single page will be fetched.
     * @returns {Promise<Record<number, IProjectDetails[]>>} A promise that resolves to a record where keys are page numbers
     * and values are arrays of `IProjectDetails` objects.
     */
    public async fetchProjectsPages(pageStart: number, pageSize: number, pageEnd: number = pageStart): Promise<Record<number, IProjectDetails[]>> {
        // Calculate the logical start and end row numbers for logging purposes, based on the page range and page size.
        const startRow = (pageStart - 1) * pageSize;
        const endRow = pageEnd * pageSize;
        console.log(
            `- Fetching rows ${startRow} to ${endRow}...
            - Paginated with page size: ${pageSize} from database...`
        );

        // Initialize an empty record to store the fetched project details, keyed by page number.
        let projectDetails: Record<number, IProjectDetails[]> = {};

        // Iterate through the requested page range to fetch projects for each page.
        for (let pageNumber = pageStart; pageNumber <= pageEnd; pageNumber++ ) {
            console.log(`Fetching page ${pageNumber} from database...`);

            // Retrieve a batch of projects for the current page number using the project repository.
            const projectArr: Project[] = (
                await this._projectRepo.GetRows(
                    Projects.ProjectId,
                    pageSize,
                    pageNumber
                )
            );

            // If no projects are returned for the current page, it signifies the end of available data,
            // so stop fetching further pages.
            if (projectArr.length == 0 ) break;
            
            // For each fetched project, asynchronously retrieve its associated frameworks
            // and construct an `IProjectDetails` object.
            // `Promise.all` ensures all framework fetches for the current page complete concurrently.
            projectDetails[pageNumber] = await Promise.all(
                projectArr.map(async (project) => ({
                    Project: project, // The core project data.
                    ProjectFrameworks: await this._projectFrameworkRepo.FindManyByProjectId(project.ProjectId) // Associated frameworks.
                }))
            );

            console.log(`Page ${pageNumber} fetched.`);
        }
        console.log(`Rows fetched from database.`);
        return projectDetails;
    }

    /**
     * Retrieves the total count of projects available in the database.
     *
     * @returns {Promise<number>} A promise resolving to the total number of project records.
     */
    public async countProjects() {
        return await this._projectRepo.GetCount();
    }
}