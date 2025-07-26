import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { API } from "@data";
import { authRoutes, authMiddlewares } from "@feature-auth";
import {
  projectsJobs,
  projectsMiddlewares,
  projectsRouter,
  projectTagsRouter,
} from "@feature-projects";
import { attachRequestLogContext, requestProfiler } from "@middleware";

const ROUTES = API.ROUTES;

const app = express();

//  whitelist api so connection works and you can make requests.
app.use(cors());

//  for express json parsing
app.use(express.json());

app.use(cookieParser());

//  logging middleware
app.use(attachRequestLogContext);
app.use(requestProfiler);

//  routes

//  auth feature
app.use(ROUTES.AUTH, authRoutes.authRouter);

const { projectsRouteLimiter } = projectsMiddlewares;
const { validateJWT } = authMiddlewares;

//  projects feature
app.use(ROUTES.PROJECTS, projectsRouteLimiter, validateJWT, projectsRouter);

app.use(
  ROUTES.PROJECT_TAGS,
  projectsRouteLimiter,
  validateJWT,
  projectTagsRouter
);

const evictionJob = projectsJobs.createEvictionJobService();
const viewsDecayJob = projectsJobs.createViewsDecayJobService();

evictionJob.scheduleProjectCacheEviction();
evictionJob.scheduleCachePageEviction();
evictionJob.scheduleSearchCacheEviction();
viewsDecayJob.scheduleViewsDecay();

app.listen(3001, "0.0.0.0", async () => {
  console.log("Server running on port 3001");
  await evictionJob.evictProjectCache();
  await evictionJob.evictCachePages();
});
