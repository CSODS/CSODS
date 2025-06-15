import { PROJECT_ROUTES } from '../data/constants/constants.js';
import { IProjectDetails } from '../viewmodels/cache/cacheInterfaces.js';
import express from 'express';

const projectsRouter = express.Router();

//  for testing
projectsRouter.get(PROJECT_ROUTES.LOAD_PROJECTS, async (req, res) => {
    const projectCacheHandler = req.projectCacheHandler;
    await projectCacheHandler.setProjectsCache();
    res.json(projectCacheHandler.getCachePages());
});

projectsRouter.get(PROJECT_ROUTES.BY_PAGE, async (req, res) => {
    const projectCacheHandler = req.projectCacheHandler;
    await projectCacheHandler.setProjectsCache();
    
    res.json(await projectCacheHandler.getOrCreatePage(Number(req.params.pageNumber)));
});

projectsRouter.get(PROJECT_ROUTES.BY_ID, async (req, res) => {
    const page: number = Number(req.params.pageNumber);
    const id: number = Number(req.params.projectId);
    const project: IProjectDetails | null = await req.projectCacheHandler.getProjectByPageAndId(page, id);
    project
        ? res.json(project)
        : res.status(404).json({error : "Project Not Found."});
})

projectsRouter.get(PROJECT_ROUTES.TITLE_SEARCH, async(req, res) => {
    res.json('hello');
})

// router.post();

export default projectsRouter;