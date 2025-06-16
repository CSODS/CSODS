var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PROJECT_ROUTES } from '../data/constants/constants.js';
import express from 'express';
const projectsRouter = express.Router();
//  for testing
projectsRouter.get(PROJECT_ROUTES.LOAD_PROJECTS, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectCacheHandler = req.projectCacheHandler;
    const { devTypeId, languageId, databaseId, industryId } = req.query;
    const filter = {
        DevTypeId: parseNumberParam(devTypeId),
        LanguageId: parseNumberParam(languageId),
        DatabaseId: parseNumberParam(databaseId),
        IndustryId: parseNumberParam(industryId)
    };
    yield projectCacheHandler.setProjectsCache(filter);
    res.json(projectCacheHandler.getCachePages());
}));
projectsRouter.get(PROJECT_ROUTES.BY_PAGE, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectCacheHandler = req.projectCacheHandler;
    const { devTypeId, languageId, databaseId, industryId } = req.query;
    const filter = {
        DevTypeId: parseNumberParam(devTypeId),
        LanguageId: parseNumberParam(languageId),
        DatabaseId: parseNumberParam(databaseId),
        IndustryId: parseNumberParam(industryId)
    };
    yield projectCacheHandler.setProjectsCache(filter);
    res.json(yield projectCacheHandler.getOrCreatePage(Number(req.params.pageNumber)));
}));
projectsRouter.get(PROJECT_ROUTES.BY_ID, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.params.pageNumber);
    const id = Number(req.params.projectId);
    const project = yield req.projectCacheHandler.getProjectByPageAndId(page, id);
    project
        ? res.json(project)
        : res.status(404).json({ error: "Project Not Found." });
}));
// router.post();
export default projectsRouter;
function parseNumberParam(value) {
    const num = typeof value === 'string' ? Number(value) : NaN;
    return isNaN(num) ? undefined : num;
}
