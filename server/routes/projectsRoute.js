import { PROJECT_ROUTES } from '../constants/constants.js';
import { Projects } from '../dist/db/schema.js';
import { csodsContext } from '../db/csods.js'; 
import express from 'express';

const router = express.Router();

router.get(PROJECT_ROUTES.ROOT, async (req, res) => {
    const projectList = await csodsContext.select().from(Projects).all();
    res.json(projectList);
});

router.get(PROJECT_ROUTES.BY_ID, async (req, res) => {
    const id = req.params.projectId;
    const project = await csodsContext.select().from(Projects).where(eq(Projects.ProjectId, id));
    res.json(project);
})

// router.post();

export default router;