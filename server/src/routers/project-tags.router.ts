import express from "express";
import { API, AUTH } from "@data";
import { validateJWT, verifyRoles } from "@middleware";

const PROJECT_TAG_ROUTES = API.PROJECT_TAG_ROUTES;
const { Guest, Student, Moderator, Administrator } = AUTH.ROLES_MAP;

const projectTagsRouter = express.Router();

projectTagsRouter.use(validateJWT);

projectTagsRouter.get(
  PROJECT_TAG_ROUTES.ALL_DATA,
  verifyRoles(
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

export default projectTagsRouter;
