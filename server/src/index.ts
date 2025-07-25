import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { API } from "@data";
import { routeLogger } from "@middleware";
import {
  authRouter,
  projectsRouter,
  projectTagsRouter,
  createEvictionJobService,
  createViewsDecayJobService,
  validateJWT,
} from "@/features";

const ROUTES = API.ROUTES;

const app = express();

//  whitelist api so connection works and you can make requests.
app.use(cors());

//  for express json parsing
app.use(express.json());

app.use(cookieParser());
app.use(routeLogger);

//  for routes
app.use(ROUTES.AUTH, authRouter);

app.use(validateJWT);

app.use(ROUTES.PROJECTS, projectsRouter);

app.use(ROUTES.PROJECT_TAGS, projectTagsRouter);

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
