import express from "express";
import { API } from "@data";
import { validateJWT } from "@/middleware";

const PROJECT_TAG_ROUTES = API.PROJECT_TAG_ROUTES;

const projectTagsRouter = express.Router();

projectTagsRouter.use(validateJWT);

projectTagsRouter.get(PROJECT_TAG_ROUTES.ALL_DATA, async (req, res) => {
  const tagsCache = await req.tagsCacheHandler.getTagsCache();

  tagsCache
    ? res.json(tagsCache)
    : res.status(404).json({ error: "Failed loading tags cache." });
});

export default projectTagsRouter;
