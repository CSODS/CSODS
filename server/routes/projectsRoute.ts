import { PROJECT_ROUTES } from '../data/constants/constants.js';
import { Project } from '../viewmodels/dbModels.js';
import express from 'express';

const projectsRouter = express.Router();

projectsRouter.get(PROJECT_ROUTES.LOAD_PROJECTS, async (req, res) => {
    res.json(await req.projectCacheHandler.setProjectsCache());
})

projectsRouter.get(PROJECT_ROUTES.BY_PAGE, async (req, res) => {
    const projectCacheHandler = req.projectCacheHandler;
    await projectCacheHandler.setProjectsCache();
    res.json(await projectCacheHandler.getJsonCachePage(Number(req.params.pageNumber)));
});

projectsRouter.get(PROJECT_ROUTES.BY_ID, async (req, res) => {
    const page: number = Number(req.params.pageNumber);
    const id: number = Number(req.params.projectId);
    const project: Project | null = await req.projectCacheHandler.getProject(page, id);
    project
        ? res.json(project)
        : res.status(404).json({error : "Project Not Found."});
})

// router.post();

export default projectsRouter;