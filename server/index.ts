import cors from 'cors';
import express from 'express';
import projectsRouter from './routes/projectsRoute.js';
import projectTagsRouter from './routes/projectTagsRoute.js';
import { ROUTES } from './data/constants/constants.js';
import { attachProjectCacheHandler, attachTagsCacheHandler } from './middleware/attacheMiddleware.js';
import { createEvictionJobService } from './utils/jobs/evictionJob.js';
import { projectsRouteLimiter, projectTagsRouteLimiter } from './utils/rateLimit/rateLimiter.js';
import { createViewsDecayJobService } from './utils/jobs/viewsDecayJob.js';

const app = express()

//  for express json parsing
app.use(express.json());
//  whitelist api so connection works and you can make requests.
app.use(cors());
app.use(attachProjectCacheHandler);
app.use(attachTagsCacheHandler);

//  for routes
app.use(ROUTES.PROJECTS, projectsRouteLimiter, projectsRouter);
app.use(ROUTES.PROJECT_TAGS, projectTagsRouteLimiter, projectTagsRouter);

const evictionJob = createEvictionJobService();
evictionJob.scheduleProjectCacheEviction();
evictionJob.scheduleCachePageEviction();

const viewsDecayJob = createViewsDecayJobService();
viewsDecayJob.scheduleViewsDecay();

app.listen(3001, '0.0.0.0', async () => {
    console.log("Server running on port 3001");
    await evictionJob.evictProjectCache();
    await evictionJob.evictCachePages();
});

