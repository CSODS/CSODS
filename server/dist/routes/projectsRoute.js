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
const router = express.Router();
router.get(PROJECT_ROUTES.LOAD_PROJECTS, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield req.projectCacheHandler.setProjectsCache());
}));
router.get(PROJECT_ROUTES.BY_PAGE, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectCacheHandler = req.projectCacheHandler;
    yield projectCacheHandler.setProjectsCache();
    res.json(yield projectCacheHandler.getJsonCachePage(Number(req.params.pageNumber)));
}));
router.get(PROJECT_ROUTES.BY_ID, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.params.pageNumber);
    const id = Number(req.params.projectId);
    const project = yield req.projectCacheHandler.getProject(page, id);
    project
        ? res.json(project)
        : res.status(404).json({ error: "Project Not Found." });
}));
// router.post();
export default router;
