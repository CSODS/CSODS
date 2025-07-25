import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { API } from "@data";
import { routeLogger } from "@middleware";
import {
  projectsRouter,
  projectTagsRouter,
  createEvictionJobService,
  createViewsDecayJobService,
} from "@/features";
import { authRoutes, authMiddlewares } from "@feature-auth";

const ROUTES = API.ROUTES;

const app = express();

//  whitelist api so connection works and you can make requests.
app.use(cors());

//  for express json parsing
app.use(express.json());

app.use(cookieParser());
app.use(routeLogger);

//  routes

//  auth feature
app.use(ROUTES.AUTH, authRoutes.authRouter);

const { validateJWT } = authMiddlewares;

//  projects feature
app.use(ROUTES.PROJECTS, validateJWT, projectsRouter);

app.use(ROUTES.PROJECT_TAGS, validateJWT, projectTagsRouter);

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
