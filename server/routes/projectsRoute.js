import { PROJECT_ROUTES } from '../constants/constants.js';
import { Projects } from '../dist/db/schema.js';
import { csodsContext } from '../db/csods.js'; 
import { eq } from 'drizzle-orm';
import express from 'express';

const router = express.Router();

let cachedProjects = null;

router.get(PROJECT_ROUTES.ROOT, async (req, res) => {
    if (cachedProjects == null) {
        const projectList = await csodsContext.select().from(Projects).all();
        cachedProjects = projectList;
    }
    res.json(cachedProjects);
});

router.get(PROJECT_ROUTES.BY_ID, async (req, res) => {
    const id = req.params.projectId;
    if (cachedProjects !== null) 
    {
        const projectList = await csodsContext.select().from(Projects).all();
        cachedProjects = projectList;
    }
    const project = cachedProjects.find(p => p.ProjectId == id);
    project
        ? res.json(project)
        : res.status(404).json({error : "Project Not Found."});
})

// router.post();

export default router;