import express from 'express';
import { CONSTANTS } from '@data';

const PROJECT_TAG_ROUTES = CONSTANTS.PROJECT_TAG_ROUTES;

const projectTagsRouter = express.Router();

projectTagsRouter.get(PROJECT_TAG_ROUTES.ALL_DATA, async (req, res) => {
    res.json(await req.tagsCacheHandler.getTagsCache());
});

export default projectTagsRouter;