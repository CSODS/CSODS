import express from 'express';
import { CONSTANTS } from '@data';
import { RouteLogger } from '@utils';

const PROJECT_TAG_ROUTES = CONSTANTS.PROJECT_TAG_ROUTES;

const projectTagsRouter = express.Router();

projectTagsRouter.get(PROJECT_TAG_ROUTES.ALL_DATA, async (req, res) => {
    RouteLogger.info(`[${PROJECT_TAG_ROUTES.ALL_DATA}] Processing request...`);
    const profiler = RouteLogger.startTimer();

    const tagsCache = await req.tagsCacheHandler.getTagsCache();
    tagsCache
        ? res.json(tagsCache)
        : res.status(404).json({error : "Failed loading tags cache."});

    profiler.done({message: `[${PROJECT_TAG_ROUTES.ALL_DATA}] Request Processed.`});
});

export default projectTagsRouter;