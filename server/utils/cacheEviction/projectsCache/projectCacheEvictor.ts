import { CachePageRecord, IProjectCache, IProjectCachePage } from "../../../viewmodels/cache/cacheInterfaces.js";
import { JsonFileHandler, createJsonFileHandler, IFile } from "../../file/fileHandler.js";
import { BaseCacheEvictor, IEvictionOptions } from "../baseCacheEvictor.js";
import dotenv from 'dotenv';
import { createProjectPageEvictor, ProjectPageEvictor } from "./projectPageEvictor.js";

dotenv.config();

export function createProjectCacheEvictor(
    cacheEvictionOptions: IEvictionOptions,
    pageEvictionOptions: IEvictionOptions
) : ProjectCacheEvictor
{
    const jsonFileHandler = createJsonFileHandler<IProjectCache>('IProjectCache');
    const pageEvictorInstance = createProjectPageEvictor(pageEvictionOptions);
    const cacheEvictorInstance = new ProjectCacheEvictor(
        jsonFileHandler,
        cacheEvictionOptions,
        pageEvictorInstance
    );
    return cacheEvictorInstance;
}

export class ProjectCacheEvictor extends BaseCacheEvictor<IProjectCache> {
    private readonly _projectPageEvictor: ProjectPageEvictor;
    private readonly _cacheDirectory = process.env.PROJECT_CACHE_PATH!;

    public constructor (
        jsonFileHandler: JsonFileHandler<IProjectCache>,
        evictionOptions: IEvictionOptions,
        projectPageEvictor: ProjectPageEvictor
    ) 
    {
        super(jsonFileHandler, evictionOptions);
        this._projectPageEvictor = projectPageEvictor;
    }

    /**
     * @public
     * 
     * @description
     * Scans the project cache directory and attempts to evict cache files 
     * that meet the given eviction criteria.
     * 
     * @param {IEvictionOptions} [evictionOptions] - Optional eviction strategy options.
     * 
     * @returns {Promise<number>} - A promise that resolves to the number of cache files evicted.
     */
    public async evictStaleCache(evictionOptions?: IEvictionOptions): Promise<number> {
        let evictionCount = 0;

        await this.processCacheFiles(this._cacheDirectory, async (file) => {
            const isEvicted = await this.tryEvict(file, evictionOptions);
            
            if (isEvicted) {
                evictionCount++;
                console.log(`Evicted file no. ${evictionCount}: ${file.Filename}`);
            }
        });
        return evictionCount;
    }
    /**
     * @public
     * 
     * @description
     * Scans the project cache directory and evicts individual stale cache pages 
     * within each cache file based on the given eviction options.
     * 
     * @param {IEvictionOptions} [evictionOptions] - Optional eviction strategy options.
     * 
     * @returns {Promise<number>} - A promise that resolves to the total number of cache pages evicted.
     */
    public async evictPagesFromCaches(evictionOptions?: IEvictionOptions): Promise<number> {
        let totalEvictedPages = 0;

        await this.processCacheFiles(this._cacheDirectory, async (file) => {
            const evictedPages = await this.evictStaleCachePages(file, evictionOptions);
            totalEvictedPages += evictedPages;
        });
        return totalEvictedPages;
    }
    /**
     * @private
     * 
     * @description
     * Evicts stale pages from the projects cache.
     * 
     * Parses an `IProjectsCache` file first. If it has pages, iterates through all pages and
     * tries each for eviction.
     *  
     * @param {IFile} file - The file to parse and evict pages from.
     * @param {IEvictionOptions} [evictionOptions] - Optional eviction strategy options (e.g., TTL, LFU).
     * 
     * @returns {Promise<number>} - A promise that resolves to the number of cache pages evicted from the file.
     */
    private async evictStaleCachePages(file: IFile, evictionOptions?: IEvictionOptions): Promise<number> {
        let evictedPages = 0;
        
        const data = await this.readFile(file);

        const cachePageRecord: CachePageRecord = data?.CachePages ?? {};

        const pageEntries = Object.entries(cachePageRecord);

        const hasPages = pageEntries.length > 0;

        if (!hasPages) {
            console.log(`Cache ${file.Filename} has no pages.`);
            return 0;
        }

        for (const pageEntry of pageEntries) {
            const pageNumber = Number(pageEntry[0]);
            const page = pageEntry[1];
            const isEvictPage = await this._projectPageEvictor.isEvict(page, evictionOptions);
            if (isEvictPage) {
                delete cachePageRecord[pageNumber];
                evictedPages++;
            }
        }
        
        try {
            await this._jsonFileHandler.writeToJsonFile(file.Filepath, file.Filename, data);
            console.log(`Successfully evicted ${evictedPages} pages from ${file.Filename}`);
            return evictedPages;
        } 
        catch (err) {
            console.error('Error evicting cache pages: ', err);
            return 0;
        }
    }
    /**
     * @private
     * 
     * @description
     * Retrieves a list of JSON cache files from the specified directory and applies
     * a given asynchronous function to each file.
     * 
     * @param {string} directory - The path to the cache directory.
     * @param {(file: IFile) => Promise<void>} func - An async function to apply to each cache file.
     * 
     * @returns {Promise<void>} - A promise that resolves once all files have been processed.
     */
    private async processCacheFiles(
        directory: string, 
        func: (file: IFile) => Promise<void>
    ): Promise<void> {
        
        const filenames = await this._jsonFileHandler.getDirectoryFilenames(directory);

        if (filenames.length === 0) {
            console.log('There are no cache files in the directory.');
            return;
        }

        for (const filename of filenames) {
            const file: IFile = {
                Filepath: this._cacheDirectory,
                Filename: filename
            };

            await func(file);
        }
    }
}
/**
 * @interface IEvictionFilter
 * @description
 * Defines filters for project cache eviction.
 */
interface IEvictionFilter {
    /**
     * Set to true if 'nofilter' cache should be included in eviction.
     */
    IncludeNoFilter: boolean
}