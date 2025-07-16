import { PROJECT_TAG_ROUTES } from '../../data/constants/constants.js';
import express from 'express';

const projectTagsRouter = express.Router();

projectTagsRouter.get(PROJECT_TAG_ROUTES.ALL_DATA, async (req, res) => {
    res.json(await req.tagsCacheHandler.getTagsCache());
});

export default projectTagsRouter;