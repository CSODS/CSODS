import express from 'express';
import router from "./routes/projectsRoute.js";
import { turso } from './db/csods.js';
import { ROUTES } from './constants/constants.js';

await turso.execute('PRAGMA foreign_keys = ON');


const app = express()

//  for express json parsing
app.use(express.json());

//  for routes
app.use(ROUTES.PROJECTS, router);

app.listen(3001, () => {
    console.log("Server running on port 3001")
});

