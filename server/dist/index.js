var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import cors from 'cors';
import express from 'express';
import projectsRouter from './routes/projectsRoute.js';
import projectTagsRouter from './routes/projectTagsRoute.js';
import { ROUTES } from './data/constants/constants.js';
import { attachProjectCacheHandler, attachTagsCacheHandler } from './middleware/attacheMiddleware.js';
import { createEvictionJobService } from './utils/jobs/evictionJob.js';
const app = express();
//  for express json parsing
app.use(express.json());
//  whitelist api so connection works and you can make requests.
app.use(cors());
app.use(attachProjectCacheHandler);
app.use(attachTagsCacheHandler);
//  for routes
app.use(ROUTES.PROJECTS, projectsRouter);
app.use(ROUTES.PROJECT_TAGS, projectTagsRouter);
const evictionJob = createEvictionJobService();
evictionJob.scheduleProjectCacheEviction();
evictionJob.scheduleCachePageEviction();
app.listen(3001, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Server running on port 3001");
}));
