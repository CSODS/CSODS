var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CACHE } from '../../data/constants/constants.js';
import { Projects } from '../../db/schema.js';
import { createContext } from '../../db/csods.js';
import { existsSync, promises as fs } from 'fs';
import dotenv from 'dotenv';
import ProjectRepository from '../../data/repositories/projectRepository.js';
dotenv.config();
/**
 * Gets the cache of projects from the stored JSON file with a specified file name.
 * Has a max attempt count of 3.
 * If the cache is null, create a new Json file and attempt to read again.
 * @returns {Promise<Project[]>} - An array of projects
 */
export function getProjectsCache() {
    return __awaiter(this, void 0, void 0, function* () {
        //  Get current date.
        const cDate = new Date();
        //  Set file name.
        const cDateString = cDate.toLocaleDateString('en-US', { timeZone: 'Asia/Singapore' });
        const fileName = `${CACHE.BASE_NAME}-${cDateString}${CACHE.AS_JSON}`;
        const filePath = `${process.env.PROJECT_CACHE_PATH}${fileName}`;
        //  Initialize Projects array.
        let cachedProjects = null;
        //  Attempt to read cache from stored Json.
        cachedProjects = yield tryReadOrWriteCache(filePath);
        //  If cache is null or empty, fall back to back ups.
        if (cachedProjects == null || cachedProjects.length == 0) {
            console.log('Failed to retrieve data from json file. Attempting to read back-ups.');
            cachedProjects = yield readCacheFromBackups(cDate);
        }
        //  Returns the cached projects or an empty array.
        return cachedProjects
            ? cachedProjects
            : [];
    });
}
/**
 * Attempts to read the cache from the stored json file.
 * If null, attempts to create a new json file with data fetched from the database.
 * This process is repeated up to three times on failure.
 * @param filePath
 * @returns
 */
function tryReadOrWriteCache(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        let cachedProjects = null;
        //  Max three attempts to get cache.
        for (let i = 0; i < 3; i++) {
            //  Attempt to read cache from stored Json file.
            cachedProjects = yield readCacheFromJson(filePath);
            //  If null, attempt to create new json file.
            if (cachedProjects == null) {
                yield writeCacheToJson(filePath);
            }
            //  If read successfully, return the cached projects.
            else {
                return cachedProjects;
            }
        }
        //  Attempt to read last newly created Json file.
        return yield readCacheFromJson(filePath);
    });
}
/**
 * Reads cache from recent backup json files.
 * If there are no recent backups, reads from the weekly back-up
 * @param cDate
 * @returns {Promise<Project[] | null>} A promise containing the array of Projects or null
 * if there are no backups found.
 */
function readCacheFromBackups(cDate) {
    return __awaiter(this, void 0, void 0, function* () {
        const backupDate = new Date(cDate);
        let cachedProjects = null;
        for (let i = 1; i <= 3; i++) {
            //  decrement day
            backupDate.setDate(backupDate.getDate() - 1);
            //  attempt to read back-up data
            const backupDateString = backupDate.toLocaleDateString('en-US', { timeZone: 'Asia/Singapore' });
            const backupFileName = `${CACHE.BASE_NAME}-${backupDateString}${CACHE.AS_JSON}`;
            const backupPath = `${process.env.PROJECT_CACHE_PATH}${backupFileName}`;
            cachedProjects = yield readCacheFromJson(backupPath);
            //  return cache if not null
            if (cachedProjects != null && cachedProjects.length > 0) {
                console.log(`Backup loaded. Loading data from ${backupFileName}...`);
                return cachedProjects;
            }
        }
        //  fall back to weekly hard back-up if recent back-ups are not found.
        const hardBackupPath = `${process.env.DEFAULT_CACHE_PATH}${CACHE.HARD_BACKUP}${CACHE.AS_JSON}`;
        return yield readCacheFromJson(hardBackupPath);
    });
}
/**
 * Retrieves an array of Projects from the stored Json file.
 * @param {string} filePath - the file path of the Json file to be read.
 * @returns {Promise<Project[] | null>} - An array of Projects or null if the readFile method failed.
 */
function readCacheFromJson(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        //  Read from json file
        try {
            //  Return null if the file does not exist.
            if (!existsSync(filePath))
                return null;
            //  Attempt to read file.
            const data = yield fs.readFile(filePath, 'utf-8');
            //  Parse Json as a Project array and return.
            const projectsJson = JSON.parse(data);
            console.log('Cache has been read successfully.');
            return projectsJson;
        }
        catch (err) {
            console.error('Error reading cache: ', err);
            return null;
        }
    });
}
/**
 * Retrieve data from the database and attempt to store it in a Json file with the
 * specified file name.
 * @param {string} filePath - the File path of the Json file.
 */
function writeCacheToJson(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        //  Retrieve project list from database.
        const csodsContext = yield createContext();
        const projectList = yield csodsContext.select().from(Projects).all();
        //  Convert to Json
        const projectsJson = JSON.stringify(projectList, null, 2);
        //  Attempt to write to new Json file.
        try {
            yield fs.writeFile(filePath, projectsJson);
        }
        catch (err) {
            console.error('Error writing cache: ', err);
            return;
        }
    });
}
export function createProjectCacheHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        const csodsContext = yield createContext();
        const projectRepositoryInstance = new ProjectRepository(csodsContext);
        return new ProjectCacheHandler(projectRepositoryInstance);
    });
}
/**
 * Manages the caching of project data, including reading from and writing to JSON files,
 * handling cache pages, and managing backup strategies. This class ensures efficient
 * retrieval of project data by utilizing an in-memory cache and persistent JSON storage.
 */
export class ProjectCacheHandler {
    constructor(projectRepository) {
        this._jsonCache = null;
        this._projectRepository = projectRepository;
    }
    /**
     * Retrieves the total number of pages available in the loaded project cache.
     * Asserts that the cache is loaded before attempting to access its properties.
     *
     * @returns The total number of pages.
     * @throws {Error} If the JSON cache is not loaded.
     */
    getTotalPages() {
        this.assertCacheLoaded(this._jsonCache);
        return this._jsonCache.TotalPages;
    }
    /**
     * Retrieves the timestamp indicating when the project cache was last loaded.
     * Asserts that the cache is loaded before attempting to access its properties.
     *
     * @returns A `Date` object representing the cache's load time.
     * @throws {Error} If the JSON cache is not loaded.
     */
    getCacheLoadTime() {
        this.assertCacheLoaded(this._jsonCache);
        return this._jsonCache.LoadTime;
    }
    /**
     * Retrieves the collection of cached project pages.
     * Asserts that the cache is loaded before attempting to access its properties.
     *
     * @returns A `ProjectCachePages` object containing the cached pages, keyed by page number.
     * @throws {Error} If the JSON cache is not loaded.
     */
    getCachePages() {
        this.assertCacheLoaded(this._jsonCache);
        return this._jsonCache.CachePages;
    }
    getProject(pageNumber, projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const cachePage = yield this.getJsonCachePage(pageNumber);
            if (cachePage != null) {
                return (_a = cachePage.ProjectList.find(p => p.ProjectId == projectId)) !== null && _a !== void 0 ? _a : null;
            }
            return null;
        });
    }
    /**
     * Gets a page with the specified page number from the cache.
     * If the page does not exist in the cache, it fetches a new page from the database,
     * adds it to the cache, then returns it.
     *
     * @param {number} pageNumber The number of the page to retrieve.
     * @returns {Promise<IProjectCache | null>} A Promise that resolves to the requested page (`IProjectCachePage`) if found or successfully fetched,
     * or `null` if an exception occurs during the process (e.g., cache not loaded, database error, or parsing issues).
     */
    getJsonCachePage(pageNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //  Throws an exception if _jsonCache is null.
                this.assertCacheLoaded(this._jsonCache);
                console.log('Attempting to retrieve page from _jsonCache...');
                //  Attempt to retrieve page from cache.
                let cachePages = this._jsonCache.CachePages;
                //  Return null if the user tries to access a page that doesn't exist.
                if (pageNumber > this._jsonCache.TotalPages) {
                    console.log('Page is out of bounds.');
                    return null;
                }
                //  If page is not in cache, fetch page from database and add to cache.
                if (!this.isPageInJsonCache(cachePages, pageNumber)) {
                    console.log('Page not in cache. Attempting to add new page...');
                    //  Returns new page if successful.
                    //  Throws an exception if updating or parsing the cache fails.
                    return yield this.setNewJsonCachePage(pageNumber);
                }
                //  Return the cache page if found in the cache.
                console.log('Page found in cache. Returning cache page...');
                return cachePages[pageNumber];
            }
            catch (err) {
                //  Return null on error.
                console.error('Failed retrieving cache page: ', err);
                return null;
            }
        });
    }
    /**
     * Gets the cache of projects from the stored JSON file with a specified file name.
     * It attempts to read the cache, and if the cache is null or empty, it tries to create a new JSON file
     * or fall back to existing backups.
     * This method has a maximum attempt count of 3 within its internal `tryParseOrCreateJsonCache` call.
     *
     * @returns {Promise<void>} A Promise that resolves when the project cache has been successfully loaded into memory, or if all attempts to load/create it fail.
     * This method does not return a value but sets the `_jsonCache` property of the class.
     */
    setProjectsCache() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            //  Get current date.
            const cDate = new Date();
            //  Set file name.
            const filePath = this.generateJsonPath(process.env.PROJECT_CACHE_PATH, CACHE.BASE_NAME, cDate);
            //  Initialize the object wherein the loaded cache will be stored..
            let cachedProjects = null;
            let cachePages = {};
            //  Attempt to read cache from stored Json.
            console.log('Attempting to parse Json cache and store in memory...');
            cachedProjects = yield this.tryParseOrCreateJsonCache(filePath);
            cachePages = (_a = cachedProjects === null || cachedProjects === void 0 ? void 0 : cachedProjects.CachePages) !== null && _a !== void 0 ? _a : {};
            //  If cache is null or empty, fall back to back ups.
            if (cachedProjects == null || Object.entries(cachePages).length == 0) {
                console.log('Failed to retrieve data from json file. Attempting to read back-ups.');
                cachedProjects = yield this.parseBackupJsonCache(cDate);
            }
            //  Sets the loaded cache into _jsonCache.
            this._jsonCache = cachedProjects;
            return this._jsonCache;
        });
    }
    //#region In-memory Cache Handler
    //#region Cache CRUD 
    /**
     * Fetches a new page of projects from the database, adds it to the in-memory cache,
     * and then attempts to persist the updated cache to a JSON file.
     *
     * @param {number} pageNumber The page number to fetch and add to the cache.
     * @returns {Promise<IProjectCachePage>} A Promise that resolves to the newly created and cached `IProjectCachePage` if successful.
     * @throws {Error} Throws an error if `_jsonCache` is null (cache not loaded), if fetching data from the database fails,
     * or if updating the JSON cache file fails. If an update fails, it attempts to remove the newly added page from the in-memory cache.
     */
    setNewJsonCachePage(pageNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //  Throws an error if _jsonCache is null.
                this.assertCacheLoaded(this._jsonCache);
                //  Fetch new page from the database.
                console.log('Attempting to fetch data for new page from database...');
                const cachePage = {
                    VisitCount: 1,
                    ProjectList: (yield this._projectRepository.GetRows(Projects.ProjectId, CACHE.PAGE_SIZE, pageNumber))
                };
                console.log('New page fetched from database.');
                this._jsonCache.CachePages[pageNumber] = cachePage;
                //  attempt to update the cache
                console.log('Updating cache...');
                const filePath = this.generateJsonPath(process.env.PROJECT_CACHE_PATH, CACHE.BASE_NAME, new Date());
                //  throws an exception if update fails.
                yield this.writeToJsonFile(filePath, this._jsonCache);
                console.log('Updated cache successfully. Returning cache page...');
                //  return if successful
                return cachePage;
            }
            catch (err) {
                console.error(`Error setting new page: ${err}`);
                //  if the update fails, check if a new page was added anyway, then remove it
                //  from the in memory cache.
                if (this._jsonCache != null && this.isPageInJsonCache(this._jsonCache.CachePages, pageNumber)) {
                    delete this._jsonCache.CachePages[pageNumber];
                }
                throw err;
            }
        });
    }
    //#endregion
    //#region Cache Utility Methods
    /**
     * Checks if a specific page number exists as a key within the provided `cachePages` object.
     *
     * @param {ProjectCachePages} cachePages The `CachePages` object (a dictionary/record) containing the cached pages.
     * @param {number} pageNumber The page number to check for existence in the cache.
     * @returns {boolean} `true` if the page number exists as a key in `cachePages`, `false` otherwise.
     */
    isPageInJsonCache(cachePages, pageNumber) {
        const pageKeys = Object.keys(cachePages);
        return pageKeys.includes(pageNumber.toString());
    }
    /**
     * Generates a new project cache object by fetching initial data from the database.
     * This includes fetching the first three pages of projects and the total count of projects.
     *
     * @returns {Promise<IProjectCache> } A Promise that resolves to an `IProjectCache` object containing the initial cached pages,
     * the total number of pages calculated from the project count, and the current load time.
     */
    generateProjectCache() {
        return __awaiter(this, void 0, void 0, function* () {
            //  fetch pages 1 to 3 from database.
            const cachePages = yield this.fetchCachePages(1, 3);
            //  fetch total project count from database.
            console.log('Fetching total projects count from database.');
            const projectsCount = yield this._projectRepository.GetCount();
            //  Convert to an object implementing the IProjectCache interface.
            const projectCache = {
                TotalPages: Math.ceil(projectsCount / CACHE.PAGE_SIZE),
                LoadTime: new Date(),
                CachePages: cachePages
            };
            return projectCache;
        });
    }
    //#endregion
    //#endregion
    //#region .json File Handler
    /**
     * Attempts to read the project cache from a specified JSON file. If the cache is not found or is null,
     * it then attempts to create a new JSON cache file with data fetched from the database.
     * This creation process is retried up to three times upon failure.
     *
     * @param {string} filePath The full path to the JSON file where the cache is expected to be stored or created.
     * @returns {Promise<IProjectCache | null>} A Promise that resolves to the parsed `IProjectCache` object if successful, or `null` if all attempts to read
     * or create the cache fail.
     */
    tryParseOrCreateJsonCache(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            //  Attempt to read cache from stored Json file.
            let cachedProjects = yield this.parseJsonCache(filePath);
            //  If cache is null, attempt to create new cache up.
            if (cachedProjects == null) {
                console.log('Loaded cache is null...');
                console.log('Attempting to create new Json cache.');
                //  Up to three attempts.
                for (let i = 0; i < 3; i++) {
                    try {
                        console.log(`Attempt no. ${i + 1}`);
                        //  throws an exception if json creation fails.
                        return yield this.createNewJsonCache(filePath);
                    }
                    catch (_a) {
                        //  log error and proceed to next attempt.
                        console.error(`Cache creation failed at attempt ${i + 1}`);
                    }
                }
            }
            //  Return cache if successfully parsed.
            else {
                return cachedProjects;
            }
            //  Return null if cache creation failed.
            console.log('Cache creation attempts failed. Returning null...');
            return null;
        });
    }
    //#region .json CRUD
    /**
     * Reads the project cache from recent daily backup JSON files. If no recent backups are found or
     * they are empty, it then attempts to read from a designated weekly backup file.
     *
     * @param {Date} cDate The current date, used to determine the dates of the recent daily backups to check.
     * @returns {Promise<IProjectCache | null>} A Promise that resolves to an `IProjectCache` object containing the project data if a valid backup is found,
     * or `null` if no recent or weekly backups are found or can be successfully parsed.
     */
    parseBackupJsonCache(cDate) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log('Attempting to parse cache from backups.');
            const backupDate = new Date(cDate);
            let cachedProjects = null;
            for (let i = 1; i <= 3; i++) {
                //  decrement day
                backupDate.setDate(backupDate.getDate() - 1);
                //  attempt to read back-up data with the specified date.
                const backupPath = this.generateJsonPath(process.env.PROJECT_CACHE_PATH, CACHE.BASE_NAME, backupDate);
                console.log(`Attempt ${i}...`);
                cachedProjects = yield this.parseJsonCache(backupPath);
                const cachePages = (_a = cachedProjects === null || cachedProjects === void 0 ? void 0 : cachedProjects.CachePages) !== null && _a !== void 0 ? _a : {};
                //  return cache if not null and has pages
                if (cachedProjects != null && Object.entries(cachePages).length > 0) {
                    console.log(`Backup loaded. Loading data from ${backupPath}...`);
                    return cachedProjects;
                }
                else
                    //  log if loading backup failed and proceed to next attempt. 
                    console.log('Loading backup failed...');
            }
            //  fall back to weekly hard backup if recent backups are not found.
            console.log('Loading cache from recent backups failed. Attempting to parse from weekly backup...');
            const hardBackupPath = this.generateJsonPath(process.env.DEFAULT_CACHE_PATH, CACHE.HARD_BACKUP);
            const hardBackupCache = yield this.parseJsonCache(hardBackupPath);
            if (hardBackupCache == null)
                console.log('Failed parsing weekly backup. Returning null...');
            else
                console.log('Weekly backup parsed.');
            return hardBackupCache;
        });
    }
    /**
     * Attempts to read and parse a JSON cache file from the specified file path.
     *
     * @param {string} filePath The full path to the JSON file to be parsed.
     * @returns {Promise<IProjectCache | null>} A Promise that resolves to an `IProjectCache` object if the file exists and is successfully parsed,
     * or `null` if the file does not exist or an error occurs during reading or parsing.
     */
    parseJsonCache(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            //  Read from json file
            try {
                console.log(`Attempting to access cache from ${filePath}...`);
                //  Return null if the file does not exist.
                if (!existsSync(filePath)) {
                    console.log(`Cache at ${filePath} does not exist. Returning null...`);
                    return null;
                }
                //  Attempt to read file.
                console.log('Cache found. Attempting to parse...');
                const data = yield fs.readFile(filePath, 'utf-8');
                //  Parse Json as a ProjectCache and return.
                const projectsJson = this.cacheReviver(data);
                console.log('Cache has been parsed successfully.');
                return projectsJson;
            }
            catch (err) {
                //  log error and return null.
                console.error('Error parsing cache: ', err);
                return null;
            }
        });
    }
    /**
     * Creates a new JSON cache file at the specified file path.
     * This involves generating an initial project cache (containing the first three pages of data),
     * converting it to a JSON string, and then writing it to the file system.
     *
     * @param {string} filePath The full path where the new JSON cache file should be created.
     * @returns {Promise<IProjectCache>} A Promise that resolves to the newly created `IProjectCache` object if successful.
     * @throws {Error} Throws an error if the file writing operation fails.
     */
    createNewJsonCache(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Attempting to create new cache at ${filePath}`);
            //  Generate a new project cache containing the first 3 pages.
            const projectCache = yield this.generateProjectCache();
            //  Write to json file.
            //  Throws an error if the writing operation fails.
            return yield this.writeToJsonFile(filePath, projectCache);
        });
    }
    /**
     * Writes the provided project cache object to a JSON file at the specified path.
     *
     * @param {string} filePath The full path to the JSON file where the cache should be written.
     * @param {IProjectCache} projectCache The `IProjectCache` object to be written to the file. This cannot be `null`.
     * @returns {Promise<IProjectCache> } A Promise that resolves to the `IProjectCache` object that was written if successful.
     * @throws {Error} Throws an error if the `projectCache` is `null` or if the file writing operation fails.
     */
    writeToJsonFile(filePath, projectCache) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //  throw exception if cache is null.
                this.assertCacheLoaded(projectCache);
                //  Attempt to write to json file.
                const projectsJson = JSON.stringify(projectCache, null, 2);
                // Ensure the directory exists. Create it recursively if it doesn't.
                console.log(`Ensuring directory exists: ${process.env.PROJECT_CACHE_PATH}`);
                yield fs.mkdir(process.env.PROJECT_CACHE_PATH, { recursive: true });
                console.log('Directory ensured.');
                console.log('Attempting to write cache...');
                yield fs.writeFile(filePath, projectsJson);
                console.log('Json cache written.');
                return projectCache;
            }
            catch (err) {
                console.error('Error writing cache: ', err);
                throw err;
            }
        });
    }
    //#endregion
    //#region .json Utility Methods 
    /**
     * Asserts that the provided cache object is not null.
     * If the cache is null, it throws an error indicating that the JSON cache is not loaded.
     * This is a helper method to ensure that operations requiring a loaded cache do not proceed with a null cache.
     *
     * @param {IProjectCache} cache The `IProjectCache` object to check for nullability.
     * @throws {Error} Throws an error with the message 'Json cache is not loaded.' if the `cache` parameter is null.
     */
    assertCacheLoaded(cache) {
        if (cache == null)
            throw new Error('Json cache is not loaded.');
    }
    /**
     * A reviver function used with `JSON.parse()` to transform specific values during the parsing of a JSON string into an `IProjectCache` object.
     * Specifically, it converts the 'LoadTime' string property back into a `Date` object.
     *
     * @param {string} data The JSON string to be parsed.
     * @returns {IProjectCache} The parsed `IProjectCache` object, with the 'LoadTime' property correctly converted to a `Date` object.
     */
    cacheReviver(data) {
        return JSON.parse(data, (key, value) => {
            if (key === 'LoadTime' && typeof value === 'string') {
                return new Date(value);
            }
            return value;
        });
    }
    /**
     * Generates a full file path for a JSON cache file, incorporating a base path, base name, and an optional date.
     * If a date is provided, it's formatted to 'en-US' locale with the 'Asia/Singapore' timezone and appended to the file name.
     * The function then adds a '.json' extension to the file name.
     *
     * @param {string} basePath The base directory path where the JSON file will be located.
     * @param {string} baseName The base name for the JSON file.
     * @param {Date} date An optional `Date` object. If provided, its string representation will be included in the file name for daily specific caches.
     * @returns {string} The complete generated file path for the JSON cache.
     */
    generateJsonPath(basePath, baseName, date = null) {
        let fileName = baseName;
        if (date != null) {
            // const dateString: string = date.toLocaleDateString('en-US', {timeZone: 'Asia/Singapore'});
            const dateString = date.toDateString();
            fileName += `-${dateString}`;
        }
        fileName += CACHE.AS_JSON;
        return `${basePath}${fileName}`;
    }
    //#endregion
    //#endregion
    //#region Database Helper
    /**
     * Fetches a range of project pages from the database and organizes them into a `ProjectCachePages` object.
     * Each page fetched will have its `VisitCount` initialized to 0.
     *
     * @param {number} pageStart The starting page number (inclusive) to fetch from the database.
     * @param {number} pageEnd The ending page number (inclusive) to fetch from the database.
     * @returns {Promise<ProjectCachePages>} A Promise that resolves to a `ProjectCachePages` object, where keys are page numbers and values are
     * `IProjectCachePage` objects containing the fetched project lists.
     */
    fetchCachePages(pageStart, pageEnd) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Fetching pages ${pageStart} to ${pageEnd} from database...`);
            let cachePages = {};
            //  fetch all rows corresponding to each page from the range.
            //  store all pages in a ProjectCachePages object.
            for (let pageNumber = pageStart; pageNumber <= pageEnd; pageNumber++) {
                console.log(`Fetching page ${pageNumber} from database...`);
                const projectList = (yield this._projectRepository.GetRows(Projects.ProjectId, CACHE.PAGE_SIZE, pageNumber));
                if (projectList.length == 0)
                    break;
                cachePages[pageNumber] = {
                    VisitCount: 0,
                    ProjectList: projectList
                };
            }
            console.log(`Pages ${pageStart} to ${pageEnd} fetched from database.`);
            return cachePages;
        });
    }
}
