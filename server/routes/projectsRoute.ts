import { PROJECT_ROUTES } from '../data/constants/constants.js';
import { IProjectDetails } from '../viewmodels/cache/cacheInterfaces.js';
import { IProjectFilter } from '../data/repositories/projectRepository.js';
import express from 'express';

const projectsRouter = express.Router();

//  for testing
projectsRouter.get(PROJECT_ROUTES.LOAD_PROJECTS, async (req, res) => {
    const projectCacheHandler = req.projectCacheHandler;

    const { devTypeId, languageId, databaseId, industryId } = req.query;

    const filter: IProjectFilter = {
        DevTypeId: parseNumberParam(devTypeId),
        LanguageId: parseNumberParam(languageId),
        DatabaseId: parseNumberParam(databaseId),
        IndustryId: parseNumberParam(industryId)
    };
    await projectCacheHandler.setProjectsCache(filter);
    res.json(projectCacheHandler.getCachePages());
});

projectsRouter.get(PROJECT_ROUTES.BY_PAGE, async (req, res) => {
    const projectCacheHandler = req.projectCacheHandler;

    const { devTypeId, languageId, databaseId, industryId } = req.query;

    const filter: IProjectFilter = {
        DevTypeId: parseNumberParam(devTypeId),
        LanguageId: parseNumberParam(languageId),
        DatabaseId: parseNumberParam(databaseId),
        IndustryId: parseNumberParam(industryId)
    };

    await projectCacheHandler.setProjectsCache(filter);
    
    res.json(await projectCacheHandler.getOrCreatePage(Number(req.params.pageNumber)));
});

projectsRouter.get(PROJECT_ROUTES.BY_ID, async (req, res) => {
    const page: number = Number(req.params.pageNumber);
    const id: number = Number(req.params.projectId);
    const project: IProjectDetails | null = await req.projectCacheHandler.getProjectByPageAndId(page, id);
    project
        ? res.json(project)
        : res.status(404).json({error : "Project Not Found."});
});

// router.post();

export default projectsRouter;

function parseNumberParam(value: any): number | undefined {
    const num = typeof value === 'string' ? Number(value) : NaN;
    return isNaN(num) ? undefined : num;
}