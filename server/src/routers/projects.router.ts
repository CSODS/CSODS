import express, { Request } from "express";
import { API } from "@data";
import { IProjectDetails } from "@viewmodels";
import { IProjectFilter } from "@services";

const PROJECT_ROUTES = API.PROJECT_ROUTES;

const projectsRouter = express.Router();

//  for testing
projectsRouter.get(PROJECT_ROUTES.LOAD_PROJECTS, async (req, res) => {
  const cacheService = req.projectCachePageService;

  const filter = assembleFilter(req);

  await cacheService.setCache(filter);
  res.json(cacheService.getCache());
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

  const cacheService = req.projectCachePageService;
  await cacheService.setCache(filter);

  const page = await cacheService.getOrCreatePage(
    Number(req.params.pageNumber)
  );

  page
    ? res.json(page)
    : res
        .status(404)
        .json({ error: `Page ${req.params.pageNumber} not found.` });
});
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
projectsRouter.get(PROJECT_ROUTES.BY_ID, async (req, res) => {
  const page: number = Number(req.params.pageNumber);
  const id: number = Number(req.params.projectId);

  const filter = assembleFilter(req);

  const cacheService = req.projectCachePageService;
  await cacheService.setCache(filter);

  const project: IProjectDetails | null =
    await cacheService.getProjectByPageAndId(page, id);
  project
    ? res.json(project)
    : res.status(404).json({ error: "Project Not Found." });
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
  const { projectTitle, devTypeId, languageId, databaseId, industryId } =
    request.query;

  const filter: IProjectFilter = {
    ProjectTitle: parseStringParam(projectTitle),
    DevTypeId: parseNumberParam(devTypeId),
    LanguageId: parseNumberParam(languageId),
    DatabaseId: parseNumberParam(databaseId),
    IndustryId: parseNumberParam(industryId),
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
function parseStringParam(value: any): string | undefined {
  const str =
    typeof value === "string"
      ? value.trim().replace("_", " ").toLowerCase()
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
function parseNumberParam(value: any): number | undefined {
  const num = typeof value === "string" ? Number(value) : NaN;
  return isNaN(num) ? undefined : num;
}
