import { CACHE } from '../../data/constants/constants.js';
import { IProjectCachePage, IProjectCache, CachePageRecord, IProjectDetails } from '../../viewmodels/cache/cacheInterfaces.js';
import { createJsonFileHandler, JsonFileHandler } from '../file/fileHandler.js';
import { createProjectDataService, ProjectDataService } from '../data/projectDataService.js';
import { startRedis } from '../../redis/redisClient.js';
import dotenv from 'dotenv';
dotenv.config();

export async function createProjectCacheHandler() {
    const projectDataServiceInstance = await createProjectDataService();
    const jsonFileHandlerInstance = createJsonFileHandler<IProjectCache>('IProjectCache');
    return new ProjectCacheHandler(projectDataServiceInstance, jsonFileHandlerInstance);
}

/**
 * Manages the caching of project data, including reading from and writing to JSON files,
 * handling cache pages, and managing backup strategies. This class ensures efficient
 * retrieval of project data by utilizing an in-memory cache and persistent JSON storage.
 */
export class ProjectCacheHandler {
    private readonly _projectDataService: ProjectDataService;
    private readonly _jsonFileHandler: JsonFileHandler<IProjectCache>
    private _jsonCache: IProjectCache | null = null;
    private _cDate: Date;

    public constructor(
        projectDataService: ProjectDataService,
        jsonFileHandler: JsonFileHandler<IProjectCache>
    ) 
    {
        this._projectDataService = projectDataService;
        this._jsonFileHandler = jsonFileHandler;
        this._cDate = new Date();
    }
    /**
     * @returns The total number of pages.
     * @throws {Error} If the JSON cache is not loaded.
     */
    public getTotalPages(): number {
        this._jsonFileHandler.assertDataNotNull(this._jsonCache);
        return this._jsonCache!.TotalPages;
    }
    /**
     * @returns A `Date` object representing the cache's load time.
     * @throws {Error} If the JSON cache is not loaded.
     */
    public getCacheLoadTime(): Date {
        this._jsonFileHandler.assertDataNotNull(this._jsonCache);
        return this._jsonCache!.LoadTime;
    }
    /**
     * @returns A `ProjectCachePages` object containing the cached pages.
     * @throws {Error} If the JSON cache is not loaded.
     */
    public getCachePages(): CachePageRecord {
        this._jsonFileHandler.assertDataNotNull(this._jsonCache);
        return this._jsonCache!.CachePages;
    }
    /**
     * Updates the internal current date (`_cDate`) to the current system date and time.
     */
    public updateDate(): void {
        this._cDate = new Date();
    }
    /**
     * Retrieves a project by page number and project ID.
     *
     * @param {number} pageNumber The page number to search.
     * @param {number} projectId The ID of the project to retrieve.
     * @returns {Promise<Project | null>} The found project or `null` if not found.
     */
    public async getProjectByPageAndId(pageNumber: number, projectId: number) : Promise<IProjectDetails | null> {
        const cachePage: IProjectCachePage | null = await this.getOrCreatePage(pageNumber);
        return cachePage?.Projects.find(p => p.Project.ProjectId == projectId) ?? null;
    }
    //#region Cache Page Retrieval
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
    public async getOrCreatePage(pageNumber: number): Promise<IProjectCachePage | null> {
        //  Verify if page is out of bounds.
        function isPageOutOfBounds(totalPages:number, pageNumber: number): boolean {
            return pageNumber === 0 || pageNumber > totalPages;
        }

        try 
        {  
            //  Throws an exception if _jsonCache is null.
            this._jsonFileHandler.assertDataNotNull(this._jsonCache);

            console.log(`Attempting to retrieve page ${pageNumber} of ${this._jsonCache.TotalPages} from _jsonCache...`);

            if (isPageOutOfBounds(this._jsonCache.TotalPages, pageNumber))
                throw new Error('That page does not exist.');

            //  Attempt to retrieve page from cache.
            const cachePages: CachePageRecord = this._jsonCache.CachePages;

            //  If page is not in cache, fetch page from database and add to cache.
            if (this.isPageMissingFromCache(cachePages, pageNumber)) {
                console.log('Page not in cache. Attempting to add new page...');
                //  Returns new page if successful.
                //  Throws an exception if updating or parsing the cache fails.
                return await this.setNewJsonCachePage(pageNumber);  
            }

            //  Return the cache page if found in the cache.
            await this.updatePageViewCount(pageNumber);
            console.log('Page found in cache. Returning cache page...');
            return cachePages[pageNumber];
        }
        catch (err)
        {
            //  Return null on error.
            console.error('Failed retrieving cache page: ', err);
            return null;
        }
    }
    /**
     * @private
     * Fetches a page from the database, adds it to the cache, and writes the updated cache to disk.
     *
     * @param {number} pageNumber - The page number to fetch and add.
     * @returns {Promise<IProjectCachePage>} The newly cached page.
     * @throws {Error} If the cache is null or the write operation fails.
     */
    private async setNewJsonCachePage(pageNumber: number) : Promise<IProjectCachePage> {
        try 
        {
            console.log('Updating cache...');
            //  Throws an error if _jsonCache is null.
            this._jsonFileHandler.assertDataNotNull(this._jsonCache);

            //  Fetch projects from the database, create a cache page, and add to in-memory cache.
            const projects = (await this._projectDataService.fetchProjectsPages(pageNumber, CACHE.PAGE_SIZE))[pageNumber];
            const cachePage: IProjectCachePage = {
                VisitCount: 1,
                Projects: projects
            };
            this._jsonCache.CachePages[pageNumber] = cachePage;

            const fileName: string = this.getFilename({isToday: true});
            await this._jsonFileHandler.writeToJsonFile(process.env.PROJECT_CACHE_PATH!, fileName, this._jsonCache);
            console.log('Updated cache successfully. Returning cache page...');

            return cachePage;
        }
        catch (err)
        {
            console.error(`Error setting new page: ${err}`);
            //  if the update fails, check if a new page was added anyway, then remove it
            //  from the in memory cache.
            if (this._jsonCache != null && !this.isPageMissingFromCache(this._jsonCache.CachePages, pageNumber)) {
                delete this._jsonCache.CachePages[pageNumber];
            }
            throw err;
        }
    }
    /**
     * @private
     * Checks whether a given page number exists in the cache.
     *
     * @param {CachePageRecord} cachePages - The current cache pages.
     * @param {number} pageNumber - The page number to verify.
     * @returns {boolean} `true` if the page exists in the cache, otherwise `false`.
     */
    private isPageMissingFromCache(cachePages: CachePageRecord, pageNumber: number): boolean {
        return !Object.keys(cachePages).includes(pageNumber.toString());
    }
    /**
     * Increments the visit count for a specific page number within the in-memory cache and persists the updated cache to a JSON file.
     *
     * This method first ensures that the JSON cache (`_jsonCache`) is not null. It then attempts to:
     * 1. Increment the `VisitCount` property of the specified `pageNumber` within the `CachePages` object in the in-memory cache.
     * 2. Generate a unique filename for the cache file using a base name and the current date.
     * 3. Asynchronously write the entire updated cache object to the designated JSON file path.
     *
     * If any error occurs during the cache update or file writing process, the original exception is caught
     * and re-thrown as a new `Error` to propagate the failure.
     *
     * @param {number} pageNumber - The page number whose visit count needs to be incremented.
     * @returns {Promise<void>} A Promise that resolves when the page view count has been successfully updated and persisted,
     * or rejects if an error occurs during the process.
     */
    private async updatePageViewCount(pageNumber: number): Promise<void> {
        //  Throws TypeError if data is null.
        this._jsonFileHandler.assertDataNotNull(this._jsonCache);
        this._jsonCache.CachePages[pageNumber].VisitCount += 1;

        //  throws an exception if update fails.
        const fileName: string = this.getFilename({isToday: true});
        await this._jsonFileHandler.writeToJsonFile(process.env.PROJECT_CACHE_PATH!, fileName, this._jsonCache);
    }
    //#endregion Cache Page Retrieval
    
    //#region Cache Retrieval
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
    public async setProjectsCache() : Promise<IProjectCache | null> {
        //  Update the class property containing the date to the current date.
        //  This is done in for handling daily batches of data stored in the cache.
        this.updateDate();
        //  Set file name.
        //  The file name will be in relation to the new updated date.
        const filename = this.getFilename({isToday: true});
        
        //  Attempt to read cache from stored Json.
        console.log('Attempting to parse Json cache and store in memory...');
        let cachedProjects: IProjectCache | null = await this.tryParseOrCreateJsonCache(filename);

        //  If cache is null or empty, fall back to back ups.
        if (!this.cacheHasPages(cachedProjects)) {
            console.log('Failed to retrieve data from json file. Attempting to read back-ups.');
            cachedProjects = await this.parseBackupJsonCache(this._cDate);
        }
        //  Sets the loaded cache into _jsonCache.
        this._jsonCache = cachedProjects;
        return this._jsonCache;
    }
    /**
     * @private
     * Tries to read a project cache from a file, and if that fails, attempts to create a new one.
     * Retries creation up to three times if needed.
     *
     * @param {string} filename - The name of the JSON cache file.
     * @returns {Promise<IProjectCache | null>} The parsed or newly created project cache, or `null` on failure.
     */
    private async tryParseOrCreateJsonCache(filename: string): Promise<IProjectCache | null> {
        //  Attempt to read cache from stored Json file.
        let cachedProjects: IProjectCache | null = await this.parseJsonCache(filename);

        //  Return cache if successfully parsed.
        if (this.cacheHasPages(cachedProjects)) {
            return cachedProjects;
        }
        //  If cache is null or has empty pages, attempt to create new cache up.
        else {
            console.log('Loaded cache is null or empty...');
            console.log('Attempting to create new Json cache.');
            //  Up to three attempts.
            for (let i = 0; i < 3; i++) {
                console.log(`Attempt no. ${i + 1}`);
                const newCache = await this.tryCreateCache(filename);
                if (this.cacheHasPages(newCache)) {
                    console.log('Cache created.');
                    return newCache;
                }
            }
        }

        //  Return null if cache creation failed.
        console.log('Cache creation attempts failed. Returning null...');
        return null;
    }
    /**
     * Attempts to create a new project cache with the given filename.
     * If the creation fails, it logs the error and returns `null`.
     *
     * @param {string} filename The name of the file for the new cache.
     * @returns {Promise<IProjectCache | null>} A Promise that resolves to the created `IProjectCache` object if successful, or `null` if creation fails.
     */
    private async tryCreateCache(filename: string): Promise<IProjectCache | null> {
        try {
            //  throws an exception if json creation fails.
            return await this.createNewJsonCache(filename);
        }
        catch (err) {
            //  log error and proceed to next attempt.
            console.error(`Cache creation failed: ${err}`);
            return null;
        }
    }    
    /**
     * @private
     * Reads a backup JSON cache from the last 3 days or a fallback weekly backup if available.
     *
     * @param {Date} cDate - The current date used to determine backup file names.
     * @returns {Promise<IProjectCache | null>} A valid cache from backups or `null` if all attempts fail.
     */
    private async parseBackupJsonCache(cDate: Date): Promise<IProjectCache | null> {
        console.log('Attempting to parse cache from backups.');
        const backupDate: Date = new Date(cDate);
        let cachedProjects: IProjectCache | null = null;
        for (let i = 1; i <= 3; i++) {
            console.log(`Attempt ${i}...`);
            //  decrement day
            backupDate.setDate(backupDate.getDate() - 1);
            //  attempt to read back-up data with the specified date.
            const backupFileName = this.getFilename({date: backupDate});
            cachedProjects = await this.parseJsonCache(backupFileName);
            if (this.cacheHasPages(cachedProjects)) {
                console.log(`Backup loaded. Loading data from ${backupFileName}...`);
                return cachedProjects;
            }
            console.log('Loading backup failed...');
        }

        console.log('Loading cache from recent backups failed. Attempting to parse from weekly backup...');
        const hardBackupFileName: string = this.getFilename({isHardBackup: true});
        const hardBackupCache: IProjectCache | null = await this.parseJsonCache(hardBackupFileName, true);
        if (this.cacheHasPages(hardBackupCache))
            console.log('Weekly backup parsed.');
        else
            console.log('Failed parsing weekly backup. Returning null...');
        return hardBackupCache;
    }
    /**
     * Asynchronously parses a JSON cache file.
     *
     * @param {string} fileName The name of the JSON file to parse.
     * @param {boolean} isHardBackup Optional. If `true`, the file will be looked for in the `DEFAULT_CACHE_PATH`; 
     * otherwise, it will use `PROJECT_CACHE_PATH`. Defaults to `false`.
     * @returns {Promise<IProjectCache | null>} A Promise that resolves to the parsed `IProjectCache` object, or `null` 
     * if the parsing fails or the file is not found.
     */
    private async parseJsonCache(fileName: string, isHardBackup: boolean = false): Promise<IProjectCache | null> {
        // Determine the base file path based on whether it's a hard backup.
        const filePath = isHardBackup ? process.env.DEFAULT_CACHE_PATH! : process.env.PROJECT_CACHE_PATH!;
        return await this._jsonFileHandler.parseJsonFile(
                filePath, 
                fileName,
                this.reviver
            );
    }
    /**
     * @private
     * Revives certain fields (e.g., converts 'LoadTime' string back into a Date).
     *
     * @param {string} key - The property name.
     * @param {any} value - The property value.
     * @returns {any} Transformed value.
     */
    private reviver(key: string, value: any) {
        if (key === 'LoadTime' && typeof value === 'string') {
            return new Date(value);
        }
        return value;
    }
    /**
     * Generates a filename based on the provided options.
     *
     * @param options An optional object that can contain:
     * - `isHardBackup`: A boolean indicating if the filename should be for a hard backup. Defaults to `false`.
     * - `isToday`: A boolean indicating if the date for the filename should be today's date. Defaults to `false`.
     * - `date`: An optional `Date` object to use for the filename. If `isToday` is `true`, `_cDate` will be used instead.
     * @returns The generated filename as a string.
     */
    private getFilename(options?: {isHardBackup?: boolean, isToday?: boolean, date?: Date}): string {
        const isHardBackup: boolean = options?.isHardBackup ?? false;
        const isToday: boolean = options?.isToday ?? false;
        const date: Date | undefined = isToday ? this._cDate : options?.date;
        const baseName = isHardBackup ? CACHE.HARD_BACKUP : CACHE.BASE_NAME;
        const dateString = date?.toDateString() ?? '';
        return this._jsonFileHandler.generateFileName(CACHE.AS_JSON, baseName, dateString);
    }
    /**
     * @private
     * Attempts to create a new project cache by fetching data from the database and writing it to a file.
     *
     * @param {string} fileName - The name of the file to write the new cache to.
     * @returns {Promise<IProjectCache>} The created project cache.
     * @throws {Error} If cache generation fails or contains no pages.
     */
    private async createNewJsonCache(fileName: string): Promise<IProjectCache> {
        console.log(`Attempting to create new cache at ${fileName}`);
        //  Generate a new project cache containing the first 3 pages.
        const projectCache: IProjectCache = await this.generateProjectCache();

        //  Throw an error if cache has no pages.
        if (!this.cacheHasPages(projectCache))
            throw new Error('Cache has no pages');

        //  Write to json file.
        //  Throws an error if the writing operation fails.
        return await this._jsonFileHandler.writeToJsonFile(
            process.env.PROJECT_CACHE_PATH!,
            fileName, 
            projectCache);
    }
    /**
     * @private
     * Fetches and assembles an initial in-memory project cache with the first three pages and total count.
     *
     * @returns {Promise<IProjectCache>} The generated in-memory project cache.
     */
    private async generateProjectCache(): Promise<IProjectCache> {
        //  Define page and cache creation utils.
        function createCachePage(projects: IProjectDetails[]): IProjectCachePage {
            return {
                VisitCount: 0,
                Projects: projects
            };
        }
        function createCachePages(pageRecord: Record<number, IProjectDetails[]>): CachePageRecord {
            let cachePages: CachePageRecord = {};
            const recordEntries = Object.entries(pageRecord);
            recordEntries.map((keyPagePair) => {
                const numericKey = Number(keyPagePair[0]);
                cachePages[numericKey] = createCachePage(keyPagePair[1])
            });
            return cachePages;
        }
        function createCache(projectsCount: number, cachePages: CachePageRecord): IProjectCache {
            return {
                TotalPages: Math.ceil(CACHE.PAGE_SIZE / projectsCount),
                LoadTime: new Date(),
                CachePages: cachePages
            };
        }
        //  Fetch data
        const pageRecord = await this._projectDataService.fetchProjectsPages(1, CACHE.PAGE_SIZE, 3);

        //  Assemble cache.
        const projectsCount: number = await this._projectDataService.countProjects();
        const cachePages: CachePageRecord = createCachePages(pageRecord);
        const projectCache: IProjectCache = createCache(projectsCount, cachePages);

        return projectCache;
    }
    /**
     * @private
     * Checks if the cache object is not null and contains at least one page.
     *
     * @param {IProjectCache | null} cache - The project cache to check.
     * @returns {boolean} `true` if the cache is not null and has pages, otherwise `false`.
     */
    private cacheHasPages(cache: IProjectCache | null): boolean {
        return cache != null && Object.keys(cache.CachePages).length > 0;
    }
    //#endregion Cache Retrieval
}