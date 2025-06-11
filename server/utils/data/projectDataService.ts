import { createContext } from '../../db/csods.js'; 
import { Projects } from '../../db/schema.js';
import { Project } from '../../viewmodels/dbModels.js';
import ProjectRepository from '../../data/repositories/projectRepository.js';

export async function createProjectDataService() {
    const dbContext = await createContext();
    const projectRepositoryInstance = new ProjectRepository(dbContext);
    return new ProjectDataService(projectRepositoryInstance);
}

/**
 * Service responsible for retrieving project data from the database via the `ProjectRepository`.
 * Provides utility methods for fetching individual or multiple pages of projects, as well as
 * querying the total count of available projects.
 */
export class ProjectDataService {
    private readonly _projectRepository: ProjectRepository;
    
    /**
     * Constructs a new instance of `ProjectDataService`.
     * 
     * @param {ProjectRepository} projectRepository - The repository instance used to fetch project data.
     */
    public constructor(projectRepository: ProjectRepository) {
        this._projectRepository = projectRepository;
    }

    /**
     * Fetches a range of project pages from the database and organizes them into a page-number-keyed record.
     *
     * Each entry corresponds to a page number and contains an array of `Project` objects.
     * Pages are fetched sequentially, and if an empty page is encountered, fetching is stopped early.
     *
     * @param {number} pageStart - The starting page number (inclusive).
     * @param {number} pageSize - The number of projects per page.
     * @param {number} pageEnd - The ending page number (inclusive).
     * @returns {Promise<Record<number, Project[]>>} A promise resolving to an object where keys are page numbers
     * and values are arrays of projects.
     */
    public async fetchPages(pageStart: number, pageSize: number, pageEnd: number): Promise<Record<number, Project[]>> {
        console.log(`Fetching pages ${pageStart} to ${pageEnd} with page size: ${pageSize} from database...`);
        let pages: Record<number, Project[]> = {};
        //  fetch all rows corresponding to each page from the range.
        //  store all pages in a Record object.
        for (let pageNumber = pageStart; pageNumber <= pageEnd; pageNumber++ ) {
            console.log(`Fetching page ${pageNumber} from database...`);
            const projectList: Project[] = (
                await this._projectRepository.GetRows(
                    Projects.ProjectId, 
                    pageSize,
                    pageNumber
                )
            )
            if (projectList.length == 0 ) break;
            pages[pageNumber] = projectList;
            console.log(`Page ${pageNumber} fetched.`);
        }
        console.log(`Pages fetched from database.`);
        return pages;
    }

    /**
     * Fetches a single page of projects from the database.
     *
     * @param {number} pageNumber - The page number to fetch.
     * @param {number} pageSize - The number of projects per page.
     * @returns {Promise<Project[]>} A promise resolving to an array of projects for the specified page.
     */
    public async fetchPage(pageNumber: number, pageSize: number): Promise<Project[]> {
        return await this._projectRepository.GetRows(
            Projects.ProjectId,
            pageSize,
            pageNumber
        );
    }
    
    /**
     * Retrieves the total count of projects available in the database.
     *
     * @returns {Promise<number>} A promise resolving to the total number of project records.
     */
    public async countProjects() {
        return await this._projectRepository.GetCount();
    }
}