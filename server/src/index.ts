import cors from "cors";
import express from "express";
import { CONSTANTS } from "@data";
import {
  attachProjectCachePageService,
  attachTagsCacheHandler,
  authRouteLimiter,
  routeLogger,
  projectsRouteLimiter,
  projectTagsRouteLimiter,
  attachUserDataService,
} from "@middleware";
import { authRouter, projectsRouter, projectTagsRouter } from "@/routers";
import { createEvictionJobService, createViewsDecayJobService } from "@utils";

const ROUTES = CONSTANTS.ROUTES;

const app = express();

//  for express json parsing
app.use(express.json());

//  whitelist api so connection works and you can make requests.
app.use(cors());

//  route logging middleware for profiling route request methods.
app.use(routeLogger);

//  for routes
app.use(ROUTES.AUTH, authRouteLimiter, attachUserDataService, authRouter);
//  TODO: add app.use(verifyJWT); for jwt verification middleware

app.use(attachProjectCachePageService);
app.use(ROUTES.PROJECTS, projectsRouteLimiter, projectsRouter);

app.use(attachTagsCacheHandler);
app.use(ROUTES.PROJECT_TAGS, projectTagsRouteLimiter, projectTagsRouter);

const evictionJob = createEvictionJobService();
evictionJob.scheduleProjectCacheEviction();
evictionJob.scheduleCachePageEviction();
evictionJob.scheduleSearchCacheEviction();

const viewsDecayJob = createViewsDecayJobService();
viewsDecayJob.scheduleViewsDecay();

app.listen(3001, "0.0.0.0", async () => {
  console.log("Server running on port 3001");
  await evictionJob.evictProjectCache();
  await evictionJob.evictCachePages();
});
