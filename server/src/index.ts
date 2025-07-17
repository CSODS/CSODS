import cors from 'cors';
import express from 'express';
import { CONSTANTS } from '@data';
import { attachTagsCacheHandler, projectsRouteLimiter, projectTagsRouteLimiter } from '@middleware';
import { projectsRouter, projectTagsRouter} from '@routes';
import { createEvictionJobService, createViewsDecayJobService } from '@utils';
import { attachProjectCachePageService } from './middleware/attacheMiddleware';

const ROUTES = CONSTANTS.ROUTES;

const app = express()

//  for express json parsing
app.use(express.json());
//  whitelist api so connection works and you can make requests.
app.use(cors());
app.use(attachTagsCacheHandler);
app.use(attachProjectCachePageService);

//  for routes
app.use(ROUTES.PROJECTS, projectsRouteLimiter, projectsRouter);
app.use(ROUTES.PROJECT_TAGS, projectTagsRouteLimiter, projectTagsRouter);

const evictionJob = createEvictionJobService();
evictionJob.scheduleProjectCacheEviction();
evictionJob.scheduleCachePageEviction();
evictionJob.scheduleSearchCacheEviction();

const viewsDecayJob = createViewsDecayJobService();
viewsDecayJob.scheduleViewsDecay();

app.listen(3001, '0.0.0.0', async () => {
    console.log("Server running on port 3001");
    await evictionJob.evictProjectCache();
    await evictionJob.evictCachePages();
});

