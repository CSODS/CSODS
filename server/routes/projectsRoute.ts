
import { PROJECT_ROUTES, CACHE } from '../data/constants/constants.js';
import { Projects } from '../db/schema.js';
import { csodsContext } from '../db/csods.js'; 
import { eq, InferSelectModel } from 'drizzle-orm';
import express from 'express';
import { startRedis } from '../redis/redisClient.js';
import {existsSync, promises as fs} from 'fs';
import { config } from 'dotenv';

const router = express.Router();

type Project = InferSelectModel<typeof Projects>;

let cachedProjects: Project[] | null = null;

router.get(PROJECT_ROUTES.ROOT, async (req, res) => {
    if (cachedProjects == null) {
        cachedProjects = await getProjectsCache();
    }
    res.json(cachedProjects);
});

router.get(PROJECT_ROUTES.BY_ID, async (req, res) => {
    const id: number = Number(req.params.projectId);
    if (cachedProjects == null) 
    {
        cachedProjects = await getProjectsCache();
    }
    const project = cachedProjects.find(p => p.ProjectId == id);
    project
        ? res.json(project)
        : res.status(404).json({error : "Project Not Found."});
})

// router.post();

export default router;

/**
 * Gets the cache of projects from the stored JSON file with a specified file name.
 * Has a max attempt count of 3.
 * If the cache is null, create a new Json file and attempt to read again.
 * @returns {Promise<Project[]>} - An array of projects
 */
async function getProjectsCache(): Promise<Project[]> {
    //  Get current date.
    const cDate: Date = new Date();
    //  Set file name.
    const cDateString: string = cDate.toLocaleDateString('en-US', {timeZone: 'Asia/Singapore'});
    const fileName: string = `${CACHE.BASE_NAME}-${cDateString}${CACHE.AS_JSON}`;
    const filePath: string = `${process.env.PROJECT_CACHE_PATH}${fileName}`
    
    //  Initialize Projects array.
    let cachedProjects: Project[] | null = null;

    //  Attempt to read cache from stored Json.
    cachedProjects = await tryReadOrWriteCache(filePath);

    //  If cache is null or empty, fall back to back ups.
    if (cachedProjects == null || cachedProjects.length == 0) {
        console.log('Failed to retrieve data from json file. Attempting to read back-ups.');

        cachedProjects = await readCacheFromBackups(cDate);
    }

    //  Returns the cached projects or an empty array.
    return cachedProjects
        ? cachedProjects
        : [];
}

/**
 * Attempts to read the cache from the stored json file.
 * If null, attempts to create a new json file with data fetched from the database.
 * This process is repeated up to three times on failure.
 * @param filePath 
 * @returns 
 */
async function tryReadOrWriteCache(filePath: string): Promise<Project[] | null> {
    let cachedProjects: Project[] | null = null;
    //  Max three attempts to get cache.
    for (let i = 0; i < 3; i++) {
        //  Attempt to read cache from stored Json file.
        cachedProjects = await readCacheFromJson(filePath);

        //  If null, attempt to create new json file.
        if (cachedProjects == null) {
            await writeCacheToJson(filePath);
        }
        //  If read successfully, return the cached projects.
        else {
            return cachedProjects;
        }
    }

    //  Attempt to read last newly created Json file.
    return await readCacheFromJson(filePath);
}

/**
 * Reads cache from recent backup json files.
 * If there are no recent backups, reads from the weekly back-up
 * @param cDate 
 * @returns {Promise<Project[] | null>} A promise containing the array of Projects or null 
 * if there are no backups found.
 */
async function readCacheFromBackups(cDate: Date): Promise<Project[] | null> {
    const backupDate: Date = new Date(cDate);

    let cachedProjects: Project[] | null = null;
    for (let i = 1; i <= 3; i++) {
        //  decrement day
        backupDate.setDate(backupDate.getDate() - 1);
        //  attempt to read back-up data
        const backupDateString: string =  backupDate.toLocaleDateString('en-US', {timeZone: 'Asia/Singapore'});
        const backupFileName = `${CACHE.BASE_NAME}-${backupDateString}${CACHE.AS_JSON}`;
        const backupPath = `${process.env.PROJECT_CACHE_PATH}${backupFileName}`;
        cachedProjects = await readCacheFromJson(backupPath);

        //  return cache if not null
        if (cachedProjects != null && cachedProjects.length > 0) {
            console.log(`Backup loaded. Loading data from ${backupFileName}...`);
            return cachedProjects;
        }
    }

    //  fall back to weekly hard back-up if recent back-ups are not found.
    const hardBackupPath: string = `${process.env.DEFAULT_CACHE_PATH}${CACHE.HARD_BACKUP}${CACHE.AS_JSON}`;
    return await readCacheFromJson(hardBackupPath);
}

/**
 * Retrieves an array of Projects from the stored Json file.
 * @param {string} filePath - the file path of the Json file to be read. 
 * @returns {Promise<Project[] | null>} - An array of Projects or null if the readFile method failed.
 */
async function readCacheFromJson(filePath: string): Promise<Project[] | null> {
    //  Read from json file
    try {
        //  Return null if the file does not exist.
        if (!existsSync(filePath)) return null;
        //  Attempt to read file.
        const data = await fs.readFile(filePath, 'utf-8');

        //  Parse Json as a Project array and return.
        const projectsJson: Project[] = JSON.parse(data);
        console.log('Cache has been read successfully.');
        return projectsJson;
    } catch (err) {
        console.error('Error reading cache: ', err);
        return null;
    }
}

/**
 * Retrieve data from the database and attempt to store it in a Json file with the
 * specified file name.
 * @param {string} filePath - the File path of the Json file. 
 */
async function writeCacheToJson(filePath: string) {
    //  Retrieve project list from database.
    const projectList: Project[] = await csodsContext.select().from(Projects).all();

    //  Convert to Json
    const projectsJson = JSON.stringify(projectList, null, 2);

    //  Attempt to write to new Json file.
    try {
        await fs.writeFile(filePath, projectsJson);
    } catch (err) {
        console.error('Error writing cache: ', err);
        return;
    }
}
