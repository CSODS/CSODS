import cors from 'cors';
import express from 'express';
import router from './routes/projectsRoute.js';
import { ROUTES } from './data/constants/constants.js';
import { attachProjectCacheHandler } from './middleware/attacheMiddleware.js';
const app = express();
//  for express json parsing
app.use(express.json());
//  whitelist api so connection works and you can make requests.
app.use(cors());
app.use(attachProjectCacheHandler);
//  for routes
const projectsRouter = router;
app.use(ROUTES.PROJECTS, projectsRouter);
app.listen(3001, () => {
    console.log("Server running on port 3001");
});
