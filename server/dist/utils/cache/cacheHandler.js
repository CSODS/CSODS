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
import { createJsonFileHandler } from '../file/fileHandler.js';
import { createProjectDataService } from '../data/projectDataService.js';
import dotenv from 'dotenv';
dotenv.config();
export function createProjectCacheHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        const projectDataServiceInstance = yield createProjectDataService();
        const jsonFileHandlerInstance = createJsonFileHandler('IProjectCache');
        return new ProjectCacheHandler(projectDataServiceInstance, jsonFileHandlerInstance);
    });
}
/**
 * Manages the caching of project data, including reading from and writing to JSON files,
 * handling cache pages, and managing backup strategies. This class ensures efficient
 * retrieval of project data by utilizing an in-memory cache and persistent JSON storage.
 */
export class ProjectCacheHandler {
    constructor(projectDataService, jsonFileHandler) {
        this._jsonCache = null;
        this._projectDataService = projectDataService;
        this._jsonFileHandler = jsonFileHandler;
    }
    /**
     * @returns The total number of pages.
     * @throws {Error} If the JSON cache is not loaded.
     */
    getTotalPages() {
        this._jsonFileHandler.assertDataNotNull(this._jsonCache);
        return this._jsonCache.TotalPages;
    }
    /**
     * @returns A `Date` object representing the cache's load time.
     * @throws {Error} If the JSON cache is not loaded.
     */
    getCacheLoadTime() {
        this._jsonFileHandler.assertDataNotNull(this._jsonCache);
        return this._jsonCache.LoadTime;
    }
    /**
     * @returns A `ProjectCachePages` object containing the cached pages.
     * @throws {Error} If the JSON cache is not loaded.
     */
    getCachePages() {
        this._jsonFileHandler.assertDataNotNull(this._jsonCache);
        return this._jsonCache.CachePages;
    }
    /**
     * Retrieves a project by page number and project ID.
     *
     * @param {number} pageNumber The page number to search.
     * @param {number} projectId The ID of the project to retrieve.
     * @returns {Promise<Project | null>} The found project or `null` if not found.
     */
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
     * Retrieves a specific page of project data from the cache.
     *
     * If the requested page exists in the in-memory cache, it returns it directly.
     * If the page is not present, it fetches the page from the database via the `ProjectRepository`,
     * adds it to the in-memory cache, updates the cache file on disk, and then returns the new page.
     *
     * This method ensures that your cache remains up to date and self-expanding as new pages are accessed.
     *
     * @param {number} pageNumber - The number of the page to retrieve (1-based index).
     * @returns {Promise<IProjectCachePage | null>} The cached or newly fetched page, or `null` if an error occurs.
     * @throws {Error} If the page cannot be fetched or cached properly.
     */
    getJsonCachePage(pageNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //  Throws an exception if _jsonCache is null.
                this._jsonFileHandler.assertDataNotNull(this._jsonCache);
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
     * Attempts to load the project cache from the primary JSON cache file. If the primary file is
     * unavailable, corrupted, or contains no project pages, it falls back to reading from backup
     * cache files based on the current date.
     *
     * The successfully loaded cache (from primary or backup) is stored internally in `_jsonCache`.
     * This method does not modify or overwrite existing cache files unless `tryParseOrCreateJsonCache`
     * performs a creation operation internally when the primary file is missing.
     *
     * @returns {Promise<IProjectCache | null>} The loaded project cache, or null if both primary and backup sources fail.
     */
    setProjectsCache() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            //  Get current date.
            const cDate = new Date();
            //  Set file name.
            const filename = this.generateFileName(CACHE.BASE_NAME, cDate);
            //  Initialize the object wherein the loaded cache will be stored..
            let cachedProjects = null;
            let cachePages = {};
            //  Attempt to read cache from stored Json.
            console.log('Attempting to parse Json cache and store in memory...');
            cachedProjects = yield this.tryParseOrCreateJsonCache(filename);
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
     * @private
     * Fetches a page from the database, adds it to the cache, and writes the updated cache to disk.
     *
     * @param {number} pageNumber - The page number to fetch and add.
     * @returns {Promise<IProjectCachePage>} The newly cached page.
     * @throws {Error} If the cache is null or the write operation fails.
     */
    setNewJsonCachePage(pageNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //  Throws an error if _jsonCache is null.
                this._jsonFileHandler.assertDataNotNull(this._jsonCache);
                //  Fetch new page from the database.
                console.log('Attempting to fetch data for new page from database...');
                const cachePage = {
                    VisitCount: 1,
                    ProjectList: (yield this._projectDataService.fetchPage(pageNumber, CACHE.PAGE_SIZE))
                };
                console.log('New page fetched from database.');
                this._jsonCache.CachePages[pageNumber] = cachePage;
                //  attempt to update the cache
                console.log('Updating cache...');
                const fileName = this.generateFileName(CACHE.BASE_NAME, new Date());
                //  throws an exception if update fails.
                yield this._jsonFileHandler.writeToJsonFile(process.env.PROJECT_CACHE_PATH, fileName, this._jsonCache);
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
    /**
     * @private
     * Tries to read a project cache from a file, and if that fails, attempts to create a new one.
     * Retries creation up to three times if needed.
     *
     * @param {string} filename - The name of the JSON cache file.
     * @returns {Promise<IProjectCache | null>} The parsed or newly created project cache, or `null` on failure.
     */
    tryParseOrCreateJsonCache(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            //  Attempt to read cache from stored Json file.
            let cachedProjects = (yield this._jsonFileHandler.parseJsonFile(process.env.PROJECT_CACHE_PATH, filename, this.reviver));
            cachedProjects = this.isCacheHasPages(cachedProjects)
                ? cachedProjects
                : null;
            //  If cache is null, attempt to create new cache up.
            if (cachedProjects == null) {
                console.log('Loaded cache is null or empty...');
                console.log('Attempting to create new Json cache.');
                //  Up to three attempts.
                for (let i = 0; i < 3; i++) {
                    try {
                        console.log(`Attempt no. ${i + 1}`);
                        //  throws an exception if json creation fails.
                        return yield this.createNewJsonCache(filename);
                    }
                    catch (err) {
                        //  log error and proceed to next attempt.
                        console.error(`Cache creation failed at attempt ${i + 1}: ${err}`);
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
    /**
     * @private
     * Reads a backup JSON cache from the last 3 days or a fallback weekly backup if available.
     *
     * @param {Date} cDate - The current date used to determine backup file names.
     * @returns {Promise<IProjectCache | null>} A valid cache from backups or `null` if all attempts fail.
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
                const backupFileName = this.generateFileName(CACHE.BASE_NAME, backupDate);
                console.log(`Attempt ${i}...`);
                cachedProjects = (yield this._jsonFileHandler.parseJsonFile(process.env.PROJECT_CACHE_PATH, backupFileName, this.reviver));
                const cachePages = (_a = cachedProjects === null || cachedProjects === void 0 ? void 0 : cachedProjects.CachePages) !== null && _a !== void 0 ? _a : {};
                //  return cache if not null and has pages
                if (cachedProjects != null && Object.entries(cachePages).length > 0) {
                    console.log(`Backup loaded. Loading data from ${backupFileName}...`);
                    return cachedProjects;
                }
                else
                    //  log if loading backup failed and proceed to next attempt. 
                    console.log('Loading backup failed...');
            }
            //  fall back to weekly hard backup if recent backups are not found.
            console.log('Loading cache from recent backups failed. Attempting to parse from weekly backup...');
            const hardBackupFileName = this.generateFileName(CACHE.HARD_BACKUP);
            const hardBackupCache = (yield this._jsonFileHandler.parseJsonFile(process.env.DEFAULT_CACHE_PATH, hardBackupFileName, this.reviver));
            if (hardBackupCache == null)
                console.log('Failed parsing weekly backup. Returning null...');
            else
                console.log('Weekly backup parsed.');
            return hardBackupCache;
        });
    }
    /**
     * @private
     * Attempts to create a new project cache by fetching data from the database and writing it to a file.
     *
     * @param {string} fileName - The name of the file to write the new cache to.
     * @returns {Promise<IProjectCache>} The created project cache.
     * @throws {Error} If cache generation fails or contains no pages.
     */
    createNewJsonCache(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Attempting to create new cache at ${fileName}`);
            //  Generate a new project cache containing the first 3 pages.
            const projectCache = yield this.generateProjectCache();
            //  Throw an error if cache has no pages.
            if (!this.isCacheHasPages(projectCache))
                throw new Error('Cache has no pages');
            //  Write to json file.
            //  Throws an error if the writing operation fails.
            return yield this._jsonFileHandler.writeToJsonFile(process.env.PROJECT_CACHE_PATH, fileName, projectCache);
        });
    }
    //#endregion Cache CRUD
    //#region Cache Utility Methods
    /**
     * @private
     * Checks whether a given page number exists in the cache.
     *
     * @param {CachePageRecord} cachePages - The current cache pages.
     * @param {number} pageNumber - The page number to verify.
     * @returns {boolean} `true` if the page exists in the cache, otherwise `false`.
     */
    isPageInJsonCache(cachePages, pageNumber) {
        const pageKeys = Object.keys(cachePages);
        return pageKeys.includes(pageNumber.toString());
    }
    /**
     * @private
     * Fetches and assembles an initial in-memory project cache with the first three pages and total count.
     *
     * @returns {Promise<IProjectCache>} The generated in-memory project cache.
     */
    generateProjectCache() {
        return __awaiter(this, void 0, void 0, function* () {
            //  fetch pages 1 to 3 from database.
            const projects = yield this._projectDataService.fetchPages(1, CACHE.PAGE_SIZE, 3);
            //  store in pages in cache pages.
            const cachePages = {};
            for (const key in Object.keys(projects)) {
                const numericKey = Number(key) + 1;
                console.log(`Adding page ${numericKey}`);
                cachePages[numericKey] = {
                    VisitCount: 0,
                    ProjectList: projects[numericKey]
                };
            }
            //  fetch total project count from database.
            console.log('Fetching total projects count from database.');
            const projectsCount = yield this._projectDataService.countProjects();
            //  Convert to an object implementing the IProjectCache interface.
            const projectCache = {
                TotalPages: Math.ceil(projectsCount / CACHE.PAGE_SIZE),
                LoadTime: new Date(),
                CachePages: cachePages
            };
            return projectCache;
        });
    }
    /**
     * @private
     * Checks if the cache object is not null and contains at least one page.
     *
     * @param {IProjectCache | null} cache - The project cache to check.
     * @returns {boolean} `true` if the cache is not null and has pages, otherwise `false`.
     */
    isCacheHasPages(cache) {
        return cache != null && Object.keys(cache.CachePages).length > 0;
    }
    //#endregion Cache Utility Methods
    //#region .json Utility Methods
    /**
     * @private
     * Revives certain fields (e.g., converts 'LoadTime' string back into a Date).
     *
     * @param {string} key - The property name.
     * @param {any} value - The property value.
     * @returns {any} Transformed value.
     */
    reviver(key, value) {
        if (key === 'LoadTime' && typeof value === 'string') {
            return new Date(value);
        }
        return value;
    }
    /**
     * @private
     * Generates a full JSON file name using a base name and an optional date.
     *
     * @param {string} baseName - The base name of the file.
     * @param {Date} [date=null] - Optional date to append to the filename.
     * @returns {string} The complete file name.
     */
    generateFileName(baseName, date = null) {
        let filename = baseName;
        if (date != null) {
            // const dateString: string = date.toLocaleDateString('en-US', {timeZone: 'Asia/Singapore'});
            const dateString = date.toDateString();
            filename += `-${dateString}`;
        }
        filename += CACHE.AS_JSON;
        return filename;
    }
}
