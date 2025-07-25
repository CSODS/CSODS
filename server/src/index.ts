import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { API } from "@data";
import {
  attachProjectCachePageService,
  attachTagsCacheHandler,
  authRouteLimiter,
  routeLogger,
  projectsRouteLimiter,
  projectTagsRouteLimiter,
} from "@middleware";
import { projectsRouter, projectTagsRouter } from "@/routers";
import { createEvictionJobService, createViewsDecayJobService } from "@utils";
import { authRouter } from "@/features";

const ROUTES = API.ROUTES;

const app = express();

//  whitelist api so connection works and you can make requests.
app.use(cors());

//  for express json parsing
app.use(express.json());

app.use(cookieParser());
app.use(routeLogger);

//  for routes
app.use(ROUTES.AUTH, authRouteLimiter, authRouter);

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
