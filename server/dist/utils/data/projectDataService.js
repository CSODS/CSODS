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
import { Projects } from '../../db/schema.js';
import ProjectRepository from '../../data/repositories/projectRepository.js';
export function createProjectDataService() {
    return __awaiter(this, void 0, void 0, function* () {
        const dbContext = yield createContext();
        const projectRepositoryInstance = new ProjectRepository(dbContext);
        return new ProjectDataService(projectRepositoryInstance);
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
    constructor(projectRepository) {
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
    fetchPages(pageStart, pageSize, pageEnd) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Fetching pages ${pageStart} to ${pageEnd} with page size: ${pageSize} from database...`);
            let pages = {};
            //  fetch all rows corresponding to each page from the range.
            //  store all pages in a Record object.
            for (let pageNumber = pageStart; pageNumber <= pageEnd; pageNumber++) {
                console.log(`Fetching page ${pageNumber} from database...`);
                const projectList = (yield this._projectRepository.GetRows(Projects.ProjectId, pageSize, pageNumber));
                if (projectList.length == 0)
                    break;
                pages[pageNumber] = projectList;
                console.log(`Page ${pageNumber} fetched.`);
            }
            console.log(`Pages fetched from database.`);
            return pages;
        });
    }
    /**
     * Fetches a single page of projects from the database.
     *
     * @param {number} pageNumber - The page number to fetch.
     * @param {number} pageSize - The number of projects per page.
     * @returns {Promise<Project[]>} A promise resolving to an array of projects for the specified page.
     */
    fetchPage(pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._projectRepository.GetRows(Projects.ProjectId, pageSize, pageNumber);
        });
    }
    /**
     * Retrieves the total count of projects available in the database.
     *
     * @returns {Promise<number>} A promise resolving to the total number of project records.
     */
    countProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._projectRepository.GetCount();
        });
    }
}
