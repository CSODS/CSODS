var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { PROJECT_ROUTES } from '../data/constants/constants.js';
const projectsRouter = express.Router();
//  for testing
projectsRouter.get(PROJECT_ROUTES.LOAD_PROJECTS, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectCacheHandler = req.projectCacheHandler;
    const filter = assembleFilter(req);
    yield projectCacheHandler.setProjectsCache(filter);
    res.json(projectCacheHandler.getCachePages());
}));
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
projectsRouter.get(PROJECT_ROUTES.BY_PAGE, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = assembleFilter(req);
    const projectCacheHandler = req.projectCacheHandler;
    yield projectCacheHandler.setProjectsCache(filter);
    res.json(yield projectCacheHandler.getOrCreatePage(Number(req.params.pageNumber)));
}));
/**
 * GET @see PROJECT_ROUTES.BY_ID for the route's address.
 *
 * Retrieves a specific project, using projectId, pageNumber, and optional filters to narrow down
 * the results.
 *
 * ### Query Parameters (all optional):
 * - `projectTitle`: string - Filter by project title. All values are considered prefixes.
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
projectsRouter.get(PROJECT_ROUTES.BY_ID, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.params.pageNumber);
    const id = Number(req.params.projectId);
    const filter = assembleFilter(req);
    const projectCacheHandler = req.projectCacheHandler;
    yield projectCacheHandler.setProjectsCache(filter);
    const project = yield req.projectCacheHandler.getProjectByPageAndId(page, id);
    project
        ? res.json(project)
        : res.status(404).json({ error: "Project Not Found." });
}));
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
function assembleFilter(request) {
    const { projectTitle, devTypeId, languageId, databaseId, industryId } = request.query;
    const filter = {
        ProjectTitle: parseStringParam(projectTitle),
        DevTypeId: parseNumberParam(devTypeId),
        LanguageId: parseNumberParam(languageId),
        DatabaseId: parseNumberParam(databaseId),
        IndustryId: parseNumberParam(industryId)
    };
    return filter;
}
/**
 * A helper function for the @see assembleFilter function.
 * Safely parses a value into a string.
 *
 * If the input is a string, remove leading and trailing whitespaces, replace underscores
 * '_' with spaces ' ', and convert to lowercase. Otherwise, returns 'undefined'.
 *
 * @param value - The value to parse, a query string parameter.
 * @returns The parsed string, or `undefined` if the input is invalid.
 */
function parseStringParam(value) {
    const str = typeof value === 'string'
        ? value.trim().replace('_', ' ').toLowerCase()
        : undefined;
    return str;
}
/**
 * A helper function for the @see assembleFilter function.
 * Safely parses a value into a number.
 *
 * If the input is a string that can be converted to a number, returns the parsed number.
 * Otherwise, returns `undefined`.
 *
 * @param value - The value to parse, a query string parameter.
 * @returns The parsed number, or `undefined` if the input is invalid.
 */
function parseNumberParam(value) {
    const num = typeof value === 'string' ? Number(value) : NaN;
    return isNaN(num) ? undefined : num;
}
