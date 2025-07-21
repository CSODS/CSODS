import dotenv from 'dotenv';
import { CONSTANTS } from '@data';
import { createJsonFileHandler, createProjectDataService, IProjectFilter, JsonFileHandler, ProjectDataService, ProjectFilter } from "@services";
import { HashService, ProjectsCacheLogger } from "@utils";
import { CachePageRecord, IProjectCache, IProjectCachePage, IProjectDetails } from "@viewmodels";
import { AbstractCacheService } from "../abstractCacheService";

dotenv.config();

const CACHE = CONSTANTS.CACHE;

export async function createProjectCacheService() {
    const projectDataServiceInstance = await createProjectDataService();
    const jsonFileHandlerInstance = createJsonFileHandler<IProjectCache>('IProjectCache');
    return new ProjectCacheService(projectDataServiceInstance, jsonFileHandlerInstance);
}
/**
 * @class ProjectCacheHandler
 * @extends AbstractCacheService
 * @description Manages the caching of project data, including reading from and writing to JSON files,
 * handling cache pages, and managing backup strategies. This class ensures efficient
 * retrieval of project data by utilizing an in-memory cache and persistent JSON storage.
 * In addition to the fields of {@link AbstractCacheService}, contains the following fields:
 * - {@link _projectDataService} - An instance of the {@link ProjectDataService} class. Used for communicating 
 * with the database.
 * - {@link _filter} - An optional {@link ProjectFilter} object containing query parameters provided by route
 * request. Used for querying the database and generating dynamic filenames.
 * - {@link _cDate} - A {@link Date} object with the value of the current date. Used for generating filenames
 * for accessing or creating date specific cache files.
 */
export class ProjectCacheService extends AbstractCacheService<IProjectCache> {
    protected readonly _projectDataService: ProjectDataService;
    protected _filter?: ProjectFilter;
    protected _cDate: Date;
    /**
     * @public
     * @constructor
     * @description Accepts parameters of type {@link ProjectDataService} and {@link JsonFileHandler}.
     * Calls the constructor of the parent class and passes an instance of {@link ProjectsCacheLogger},
     * an instance of {@link JsonFileHandler}, and the path to the location of all project cache files as specified
     * in environment variables.
     * 
     * @param projectDataService - An instance of the {@link ProjectDataService} class. Used for communicating 
     * with the database.
     * @param jsonFileHandler - An instance of the {@link JsonFileHandler} class. A core component for the default
     * CRUD operations of the cache service.
     */
    public constructor(
        projectDataService: ProjectDataService,
        jsonFileHandler: JsonFileHandler<IProjectCache>
    )
    {
        const logger = ProjectsCacheLogger;
        const cachePath = process.env.PROJECT_CACHE_PATH!;
        super(logger, jsonFileHandler, cachePath);
        this._projectDataService = projectDataService;
        this._cDate = new Date();
    }
    /**
     * @public
     * @method updateDate
     * @description Updates the internal current date {@link _cDate} to the current system date and time.
     */
    public updateDate(): void {
        this._cDate = new Date();
    }
    /**
     * @public
     * @async
     * @override
     * @method setCache
     * @description Loads the project cache based on the current date and optional filter criteria.
     * 
     * This method first updates the internal date state {@link _cDate} and initializes the filter 
     * (if provided) as a {@link ProjectFilter} instance. It then attempts to load the cache from a 
     * JSON file whose name is derived from the current date and filter configuration.
     * 
     * If the primary JSON cache is missing, corrupted, or contains no pages, and a filter is 
     * active, it returns `null` (indicating no results for the given filter). If no filter is 
     * active, it falls back to attempting to load from backup cache files based on the current date.
     * 
     * The successfully loaded cache (whether from the primary or backup source) is stored internally 
     * in {@link _cache} and returned.
     * 
     * @param filterOptions - Optional filtering parameters used to narrow down cached projects.
     * @returns The loaded project cache, or `null` if no results were found for 
     * an active filter or all loading attempts failed.
     */
    public override async setCache(filterOptions?: IProjectFilter): Promise<IProjectCache | null> {
        this.updateDate();
        const filter = new ProjectFilter(filterOptions);
        this._filter = filter.isEmpty() ? undefined : filter;

        const isFiltered = filter ? true : false;
        this._filename = this.getFilename({ isToday: true, isFiltered: isFiltered });

        const cachedProjects: IProjectCache | null = await this.tryParseOrCreateCache();

        if (this.isCacheValid(cachedProjects)) {
            this._cache = cachedProjects;
        }
        else {
            if (this._filter) {
                this._logger.warn('Backup cache can only be loaded without filters.');
                this._cache = null;
            } else {
                const backupCache = await this.parseBackupCache();
                this._cache = backupCache;
            }
        }

        if (!this.isCacheValid(this._cache)) {
            this._logger.warn('All cache retrieval fallback routines failed. Returning null...');
        }

        return this._cache;
    }
    /**
     * @protected
     * @override
     * @method getFilename
     * @description Generates a JSON cache filename based on backup type, date, and optional filters.
     *
     * The filename format typically includes:
     * - A base name ({@link CACHE.BASE_NAME} or {@link CACHE.HARD_BACKUP})
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
    protected override getFilename(options?: {isHardBackup?: boolean, isToday?: boolean, date?: Date, isFiltered?: boolean}): string {
        //  Resolve options.
        const isHardBackup: boolean = options?.isHardBackup ?? false;
        const isToday: boolean = options?.isToday ?? false;
        const isFiltered: boolean = options?.isFiltered ?? false;

        //  Assemble filename elements.
        const baseName = isHardBackup ? CACHE.HARD_BACKUP : CACHE.BASE_NAME;
        
        const date: Date | undefined = isToday ? this._cDate : options?.date;
        const dateString = date?.toISOString().split('T')[0] ?? '';

        const filterList = this._filter?.getFilterList() ?? ['nofilter'];

        const hasSearchKey = this._filter !== undefined && this._filter?.hasProjectSearchKey();

        filterList[0] = hasSearchKey 
            ? HashService.simpleHash(filterList[0]) //  hashed searchkey
            : filterList[0];  

        const filterString = isFiltered ? filterList.join('_') : 'nofilter';
        
        return this._jsonFileHandler.generateFileName(CACHE.AS_JSON, baseName, filterString, dateString);
    }
    /**
     * @protected
     * @override
     * @method isCacheValid
     * @description Checks if the cache object is not `null` and contains at least one page.
     *
     * @param cache - The project cache to check.
     * @returns `true` if the cache is not `null` and has pages, otherwise `false`.
     */
    protected override isCacheValid(cache: IProjectCache | null): boolean {
        return cache !== null && Object.keys(cache.CachePages).length > 0;
    }
    /**
     * @protected
     * @override
     * @async
     * @method constructCache
     * @description Fetches and assembles an initial in-memory project cache with the first three pages and 
     * total count.
     *
     * @returns The generated in-memory project cache.
     */
    protected override async constructCache(): Promise<IProjectCache> {
            //  Define page and cache creation utils.
            function createCachePage(date: Date, totalPages: number, projects: IProjectDetails[]): IProjectCachePage {
                return {
                    CreatedOn: date,
                    LastAccessed: date,
                    ViewCount: 0,
                    TotalPages: totalPages,
                    Projects: projects
                };
            }
            function createCachePages(totalPages: number, date: Date, pageRecord: Record<number, IProjectDetails[]>): CachePageRecord {
                let cachePages: CachePageRecord = {};
                const recordEntries = Object.entries(pageRecord);
                recordEntries.map((keyPagePair) => {
                    const numericKey = Number(keyPagePair[0]);
                    cachePages[numericKey] = createCachePage(date, totalPages, keyPagePair[1])
                });
                return cachePages;
            }
            function createCache(totalPages: number, date: Date, cachePages: CachePageRecord): IProjectCache {
                return {
                    TotalPages: totalPages,
                    CreatedOn: date,
                    LastAccessed: date,
                    ViewCount: 1,
                    IsBackup: false,
                    CachePages: cachePages
                };
            }
            //  Fetch data
            const pageRecord = await this._projectDataService.fetchProjectsPages(
                {
                    pageStart: 1, 
                    pageSize: CACHE.PAGE_SIZE, 
                    isAscending: false,
                    filter: this._filter
                }
            );
    
            //  Assemble cache.
            const projectsCount: number = await this._projectDataService.fetchProjectsCount(this._filter);
            const totalPages = Math.ceil(projectsCount / CACHE.PAGE_SIZE);
            const cachePages: CachePageRecord = createCachePages(totalPages, this._cDate, pageRecord);
            const projectCache: IProjectCache = createCache(totalPages, this._cDate, cachePages);
            return projectCache;
    }
    /**
     * @private
     * @async
     * @description Reads a backup JSON cache from the last 3 days or a fallback weekly backup if available.
     *
     * @returns A valid cache from backups or `null` if all attempts fail.
     */
    private async parseBackupCache(): Promise<IProjectCache | null> {
        this._logger.info('Attempting to parse backup cache.');

        const backupDate: Date = new Date(this._cDate);
        for (let i = 1; i <= 3; i++) {

            backupDate.setDate(backupDate.getDate() - 1);
            this._filename = this.getFilename({date: backupDate});

            const cachedProjects: IProjectCache | null = await this.parseCache();
            
            if (this.isCacheValid(cachedProjects)) {
                this._logger.info(`Success loading backup cache ${this._filename}`);
                cachedProjects!.IsBackup = true;
                return cachedProjects;
            }
            
        }

        this._filename = this.getFilename({isHardBackup: true});
        const hardBackupPath = process.env.DEFAULT_CACHE_PATH!;
        const hardBackupCache: IProjectCache | null = await this.parseCache(hardBackupPath);

        if (this.isCacheValid(hardBackupCache)) {
            ProjectsCacheLogger.info(`Success loading hard backup cache.`);
            hardBackupCache!.IsBackup = true;
            return hardBackupCache;
        }

        return null;
    }
}