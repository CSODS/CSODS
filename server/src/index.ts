import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { API, CORS } from "@data";
import { authRoutes, authMiddlewares } from "@feature-auth";
import {
  ProjectsApiV2,
  projectsMiddlewares,
  projectsRouter,
  projectsRouterV2,
  projectTagsRouter,
} from "@feature-projects";
import "./schedulers/cron-schedulers";
import {
  attachRequestLogContext,
  requestProfiler,
  setHeaderCredentials,
} from "@middleware";

const ROUTES = API.ROUTES;

const app = express();

app.use(setHeaderCredentials);
//  whitelist api so connection works and you can make requests.
app.use(cors(CORS.getCorsOptions()));

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

//  v2 projects
app.use(
  ProjectsApiV2.ROOT,
  projectsRouteLimiter,
  validateJWT,
  projectsRouterV2
);

app.listen(3001, "0.0.0.0", async () => {
  console.log("Server running on port 3001");
});
