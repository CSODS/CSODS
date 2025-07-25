import express from "express";
import { API, AUTH } from "@data";
import { validateRoles } from "@middleware";
import { attachTagsCacheHandler, projectTagsRouteLimiter } from "./middleware";

const PROJECT_TAG_ROUTES = API.PROJECT_TAG_ROUTES;
const { Guest, Student, Moderator, Administrator } = AUTH.ROLES_MAP;

export const projectTagsRouter = express.Router();

projectTagsRouter.use(projectTagsRouteLimiter);
projectTagsRouter.use(attachTagsCacheHandler);

projectTagsRouter.get(
  PROJECT_TAG_ROUTES.ALL_DATA,
  validateRoles(
    Guest.roleName,
    Student.roleName,
    Moderator.roleName,
    Administrator.roleName
  ),
  async (req, res) => {
    const tagsCache = await req.tagsCacheHandler.getTagsCache();

    tagsCache
      ? res.json(tagsCache)
      : res.status(404).json({ error: "Failed loading tags cache." });
  }
);
