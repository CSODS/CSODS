import cors from 'cors';
import express from 'express';
import router from './routes/projectsRoute.js';
import { turso } from './db/csods.js';
import { ROUTES } from './constants/constants.js';

await turso.execute('PRAGMA foreign_keys = ON');


const app = express()

//  for express json parsing
app.use(express.json());
//  whitelist api so connection works and you can make requests.
app.use(cors());

//  for routes
const projectsRouter = router;
app.use(ROUTES.PROJECTS, projectsRouter);

app.listen(3001, () => {
    console.log("Server running on port 3001")
});

