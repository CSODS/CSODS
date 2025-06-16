import { CACHE } from '../../data/constants/constants.js';
import { IProjectCachePage, IProjectCache, CachePageRecord, IProjectDetails } from '../../viewmodels/cache/cacheInterfaces.js';
import { IProjectFilter, ProjectFilter } from '../../data/repositories/projectRepository.js';
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
    private _filter?: ProjectFilter;
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
     * @param pageNumber The page number to search.
     * @param projectId The ID of the project to retrieve.
     * @returns The found project or `null` if not found.
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
     * @param pageNumber - The number of the page to retrieve (1-based index).
     * @returns The cached or newly fetched page, or `null` if an error occurs.
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
     * @param pageNumber - The page number to fetch and add.
     * @returns The newly cached page.
     * @throws {Error} If the cache is null or the write operation fails.
     */
    private async setNewJsonCachePage(pageNumber: number) : Promise<IProjectCachePage> {
        try 
        {
            console.log('Updating cache...');

            this._jsonFileHandler.assertDataNotNull(this._jsonCache);   //  Throws an error if _jsonCache is null.

            //  Fetch projects from database
            const projects = (
                await this._projectDataService.fetchProjectsPages({
                    pageStart: pageNumber, 
                    pageSize: CACHE.PAGE_SIZE, 
                    filter: this._filter
                })
            )[pageNumber]; 
            
            //  Assemble cache page.
            const cachePage: IProjectCachePage = {
                VisitCount: 1,
                Projects: projects
            };

            this._jsonCache.CachePages[pageNumber] = cachePage;

            const fileName: string = this.getFilename({isToday: true, isFiltered: true});
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
     * @param cachePages - The current cache pages.
     * @param pageNumber - The page number to verify.
     * @returns `true` if the page exists in the cache, otherwise `false`.
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
     * @param pageNumber - The page number whose visit count needs to be incremented.
     * @returns A Promise that resolves when the page view count has been successfully updated and persisted,
     * or rejects if an error occurs during the process.
     */
    private async updatePageViewCount(pageNumber: number): Promise<void> {
        //  Throws TypeError if data is null.
        this._jsonFileHandler.assertDataNotNull(this._jsonCache);
        this._jsonCache.CachePages[pageNumber].VisitCount += 1;

        //  throws an exception if update fails.
        const fileName: string = this.getFilename({isToday: true, isFiltered: true});
        await this._jsonFileHandler.writeToJsonFile(process.env.PROJECT_CACHE_PATH!, fileName, this._jsonCache);
    }
    //#endregion Cache Page Retrieval
    
    //#region Cache Retrieval
    /**
     * Loads the project cache based on the current date and optional filter criteria.
     * 
     * This method first updates the internal date state (`_cDate`) and initializes the filter 
     * (if provided) as a `ProjectFilter` instance. It then attempts to load the cache from a 
     * JSON file whose name is derived from the current date and filter configuration.
     * 
     * If the primary JSON cache is missing, corrupted, or contains no pages, and a filter is 
     * active, it returns `null` (indicating no results for the given filter). If no filter is 
     * active, it falls back to attempting to load from backup cache files based on the current date.
     * 
     * The successfully loaded cache (whether from the primary or backup source) is stored internally 
     * in `_jsonCache` and returned.
     * 
     * @param filterOptions - Optional filtering parameters used to narrow down cached projects.
     * @returns The loaded project cache, or `null` if no results were found for 
     * an active filter or all loading attempts failed.
     */
    public async setProjectsCache(filterOptions?: IProjectFilter) : Promise<IProjectCache | null> {
        this.updateDate();  //  Refresh internal date used for filename generation.
        const filter = new ProjectFilter(filterOptions);
        this._filter = filter.isEmpty() ? undefined : filter;
        
        const filename = this.getFilename({isToday: true, isFiltered: true});
        
        console.log('Attempting to parse Json cache and store in memory...');
        let cachedProjects: IProjectCache | null = await this.tryParseOrCreateJsonCache(filename);

        //  Fallback logic for invalid cache.
        if (!this.cacheHasPages(cachedProjects)) {
            if (this._filter) {
                console.log('No cached results for active filters.');
                return null;
            }

            console.log('Failed to retrieve data from json file. Attempting to read back-ups.');
            cachedProjects = await this.parseBackupJsonCache(this._cDate);
        }
        
        this._jsonCache = cachedProjects;
        return this._jsonCache;
    }
    /**
     * @private
     * Tries to read a project cache from a file, and if that fails, attempts to create a new one.
     * Retries creation up to three times if needed.
     *
     * @param filename - The name of the JSON cache file.
     * @returns The parsed or newly created project cache, or `null` on failure.
     */
    private async tryParseOrCreateJsonCache(filename: string): Promise<IProjectCache | null> {
        let cachedProjects: IProjectCache | null = await this.parseJsonCache(filename);

        if (this.cacheHasPages(cachedProjects)) {
            return cachedProjects;
        }
        
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
     * @param filename The name of the file for the new cache.
     * @returns A Promise that resolves to the created `IProjectCache` object if successful, or `null` if creation fails.
     */
    private async tryCreateCache(filename: string): Promise<IProjectCache | null> {
        try {
            //  throws an exception if json creation fails.
            return await this.createNewJsonCache(filename);
        }
        catch (err) {
            console.error(`Cache creation failed: ${err}`);
            return null;
        }
    }    
    /**
     * @private
     * Reads a backup JSON cache from the last 3 days or a fallback weekly backup if available.
     *
     * @param cDate - The current date used to determine backup file names.
     * @returns A valid cache from backups or `null` if all attempts fail.
     */
    private async parseBackupJsonCache(cDate: Date): Promise<IProjectCache | null> {
        console.log('Attempting to parse cache from recent backups.');
        const backupDate: Date = new Date(cDate);
        for (let i = 1; i <= 3; i++) {
            console.log(`Attempt ${i}...`);

            backupDate.setDate(backupDate.getDate() - 1);
            const backupFileName: string = this.getFilename({date: backupDate});

            const cachedProjects: IProjectCache | null = await this.parseJsonCache(backupFileName);
            
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
     * @param fileName The name of the JSON file to parse.
     * @param isHardBackup Optional. If `true`, the file will be looked for in the `DEFAULT_CACHE_PATH`; 
     * otherwise, it will use `PROJECT_CACHE_PATH`. Defaults to `false`.
     * @returns A Promise that resolves to the parsed `IProjectCache` object, or `null` 
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
     * @param key - The property name.
     * @param value - The property value.
     * @returns The transformed value.
     */
    private reviver(key: string, value: any) {
        if (key === 'LoadTime' && typeof value === 'string') {
            return new Date(value);
        }
        return value;
    }
    /**
     * Generates a JSON cache filename based on backup type, date, and optional filters.
     *
     * The filename format typically includes:
     * - A base name (`CACHE.BASE_NAME` or `CACHE.HARD_BACKUP`)
     * - A filter string (joined by underscores or `'nofilter'`)
     * - A date string in `YYYY-MM-DD` format
     *
     * Example: `projects_nofilter_2025-06-16.json`
     *
     * @param options Optional configuration object:
     * - `isHardBackup` (boolean): If `true`, uses the hard backup base name. Defaults to `false`.
     * - `isToday` (boolean): If `true`, uses the current internal `_cDate` instead of a provided date. Defaults to `false`.
     * - `date` (Date): A custom date to use for filename generation if `isToday` is not `true`.
     * - `isFiltered` (boolean): If `true`, includes the current filter values in the filename. If `false`, uses `'nofilter'`.
     *
     * @returns The constructed filename for the cache file.
     */
    private getFilename(options?: {isHardBackup?: boolean, isToday?: boolean, date?: Date, isFiltered?: boolean}): string {
        //  Resolve options.
        const isHardBackup: boolean = options?.isHardBackup ?? false;
        const isToday: boolean = options?.isToday ?? false;
        const date: Date | undefined = isToday ? this._cDate : options?.date;
        const isFiltered: boolean = options?.isFiltered ?? false;

        //  Assemble filename elements.
        const baseName = isHardBackup ? CACHE.HARD_BACKUP : CACHE.BASE_NAME;
        const dateString = date?.toISOString().split('T')[0] ?? '';
        const filterList = this._filter?.getFilterList() ?? ['nofilter'];
        const filterString = isFiltered ? filterList.join('_') : 'nofilter';
        
        return this._jsonFileHandler.generateFileName(CACHE.AS_JSON, baseName, filterString, dateString);
    }
    /**
     * @private
     * Attempts to create a new project cache by fetching data from the database and writing it to a file.
     *
     * @param fileName - The name of the file to write the new cache to.
     * @returns The created project cache.
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
     * @returns The generated in-memory project cache.
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
                TotalPages: Math.ceil(projectsCount / CACHE.PAGE_SIZE ),
                LoadTime: new Date(),
                CachePages: cachePages
            };
        }
        //  Fetch data
        const pageRecord = await this._projectDataService.fetchProjectsPages(
            {
                pageStart: 1, 
                pageSize: CACHE.PAGE_SIZE, 
                pageEnd: 3, 
                filter: this._filter
            }
        );

        //  Assemble cache.
        const projectsCount: number = await this._projectDataService.fetchProjectsCount(this._filter);
        const cachePages: CachePageRecord = createCachePages(pageRecord);
        const projectCache: IProjectCache = createCache(projectsCount, cachePages);
        return projectCache;
    }
    /**
     * @private
     * Checks if the cache object is not null and contains at least one page.
     *
     * @param cache - The project cache to check.
     * @returns `true` if the cache is not null and has pages, otherwise `false`.
     */
    private cacheHasPages(cache: IProjectCache | null): boolean {
        return cache != null && Object.keys(cache.CachePages).length > 0;
    }
    //#endregion Cache Retrieval
}