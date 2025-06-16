import express, { Request } from 'express';
import { PROJECT_ROUTES } from '../data/constants/constants.js';
import { IProjectDetails } from '../viewmodels/cache/cacheInterfaces.js';
import { IProjectFilter } from '../data/repositories/projectRepository.js';

const projectsRouter = express.Router();

//  for testing
projectsRouter.get(PROJECT_ROUTES.LOAD_PROJECTS, async (req, res) => {
    const projectCacheHandler = req.projectCacheHandler;

    const filter = assembleFilter(req);

    await projectCacheHandler.setProjectsCache(filter);
    res.json(projectCacheHandler.getCachePages());
});

/**
 * GET @see PROJECT_ROUTES.BY_PAGE for the route's address.
 * 
 * Retrieves a specific page of projects, using optional filters to narrow down the results.
 * 
 * ### Query Parameters (all optional):
 * - `devTypeId`: number – Filter by development type ID.
 * - `languageId`: number – Filter by programming language ID.
 * - `databaseId`: number – Filter by database technology ID.
 * - `industryId`: number – Filter by application industry ID.
 * 
 * ### Route Parameters:
 * - `pageNumber`: number (required) – The page number to retrieve.
 * 
 * ### Response:
 * Returns a JSON object representing a single page of project data from the cache.
 */
projectsRouter.get(PROJECT_ROUTES.BY_PAGE, async (req, res) => {

    const filter = assembleFilter(req);

    const projectCacheHandler = req.projectCacheHandler;
    await projectCacheHandler.setProjectsCache(filter);
    
    res.json(await projectCacheHandler.getOrCreatePage(Number(req.params.pageNumber)));
});
/**
 * GET @see PROJECT_ROUTES.BY_ID for the route's address.
 * 
 * Retrieves a specific project, using projectId, pageNumber, and optional filters to narrow down 
 * the results.
 * 
 * ### Query Parameters (all optional):
 * - `devTypeId`: number – Filter by development type ID.
 * - `languageId`: number – Filter by programming language ID.
 * - `databaseId`: number – Filter by database technology ID.
 * - `industryId`: number – Filter by application industry ID.
 * 
 * ### Route Parameters:
 * - `pageNumber`: number (required) – The page number to retrieve.
 * - `projectId`: number (required) - The projectId.
 * 
 * ### Response:
 * Returns a JSON object representing a single project.
 */
projectsRouter.get(PROJECT_ROUTES.BY_ID, async (req, res) => {
    const page: number = Number(req.params.pageNumber);
    const id: number = Number(req.params.projectId);

    const filter = assembleFilter(req);

    const projectCacheHandler = req.projectCacheHandler;
    await projectCacheHandler.setProjectsCache(filter);

    const project: IProjectDetails | null = await req.projectCacheHandler.getProjectByPageAndId(page, id);
    project
        ? res.json(project)
        : res.status(404).json({error : "Project Not Found."});
});

// router.post();

export default projectsRouter;

/**
 * Extracts and parses query parameters from the request object to construct an `IProjectFilter`.
 *
 * Converts query values to numbers and filters out invalid or undefined values.
 *
 * @param request - The Express request object containing the query parameters.
 * @returns A constructed filter object used to query or filter projects.
 *
 * @see parseNumberParam - Utility function used to safely parse numeric query parameters.
 */
function assembleFilter(request: Request): IProjectFilter {
    const { devTypeId, languageId, databaseId, industryId } = request.query;

    const filter: IProjectFilter = {
        DevTypeId: parseNumberParam(devTypeId),
        LanguageId: parseNumberParam(languageId),
        DatabaseId: parseNumberParam(databaseId),
        IndustryId: parseNumberParam(industryId)
    };
    return filter;
}

/**
 * Safely parses a value into a number.
 *
 * If the input is a string that can be converted to a number, returns the parsed number.
 * Otherwise, returns `undefined`.
 *
 * @param value - The value to parse, typically a query string parameter.
 * @returns The parsed number, or `undefined` if the input is invalid.
 */
function parseNumberParam(value: any): number | undefined {
    const num = typeof value === 'string' ? Number(value) : NaN;
    return isNaN(num) ? undefined : num;
}