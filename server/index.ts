import cors from 'cors';
import express from 'express';
import projectsRouter from './routes/projectsRoute.js';
import projectTagsRouter from './routes/projectTagsRoute.js';
import { ROUTES } from './data/constants/constants.js';
import { attachProjectCacheHandler, attachTagsCacheHandler } from './middleware/attacheMiddleware.js';
import { EvictionJobService, createEvictionJobService } from './utils/jobs/evictionJob.js';

const app = express()

//  for express json parsing
app.use(express.json());
//  whitelist api so connection works and you can make requests.
app.use(cors());
app.use(attachProjectCacheHandler);
app.use(attachTagsCacheHandler);

//  for routes
app.use(ROUTES.PROJECTS, projectsRouter);
app.use(ROUTES.PROJECT_TAGS, projectTagsRouter);

const evictionJob = createEvictionJobService();
evictionJob.scheduleProjectCacheEviction();
evictionJob.scheduleCachePageEviction();

app.listen(3001, async () => {
    console.log("Server running on port 3001");
});

