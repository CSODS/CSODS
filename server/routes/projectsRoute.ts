
import { PROJECT_ROUTES } from '../data/constants/constants.js';
import { Project } from '../viewmodels/dbModels.js';
import express from 'express';

const router = express.Router();

router.get(PROJECT_ROUTES.BY_PAGE, async (req, res) => {
    res.json(await req.projectCacheHandler.getJsonCachePage(Number(req.params.pageNumber)));
});

router.get(PROJECT_ROUTES.BY_ID, async (req, res) => {
    const page: number = Number(req.params.pageNumber);
    const id: number = Number(req.params.projectId);
    const project: Project | null = await req.projectCacheHandler.getProject(page, id);
    project
        ? res.json(project)
        : res.status(404).json({error : "Project Not Found."});
})

// router.post();

export default router;