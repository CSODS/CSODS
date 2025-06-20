import { CachePageRecord, IProjectCache, IProjectCachePage } from "../../../viewmodels/cache/cacheInterfaces.js";
import { IFile, JsonFileHandler } from "../../file/fileHandler.js";
import { BaseCacheEvictor, IEvictionOptions } from "../baseCacheEvictor.js";
import dotenv from 'dotenv';
import { ProjectPageEvictor } from "./projectPageEvictor.js";

dotenv.config();


export class ProjectCacheEvictor extends BaseCacheEvictor<IProjectCache> {
    private readonly _projectPageEvictor: ProjectPageEvictor;
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
     * Retrieves a list of filenames from the project cache directory then iterates through each.
     * Each file will then be tried for eviction.
     * 
     * @param {IEvictionOptions} evictionOptions - Specifies the eviction options.
     * 
     * @returns {Promise<number>} - A promise that resolves to how many cache files were evicted.
     */
    public async evictStaleCache(evictionOptions?: IEvictionOptions): Promise<number> {
        let evictionCount = 0;

        const filepath = process.env.PROJECT_CACHE_PATH!;
        //  Get filenames from dir
        const filenames = await this._jsonFileHandler.getDirectoryFilenames(filepath);

        if (filenames.length === 0) {
            console.log('There are no cache files in the directory.');
            return 0;
        }

        //  Try each file for eviction.
        for (const filename of filenames) {
            const file: IFile = {
                Filepath: filepath,
                Filename: filename
            };

            const isEvicted = await this.tryEvict(file, evictionOptions);
            
            if (isEvicted) {
                evictionCount++;
                console.log(`Evicted file no. ${evictionCount}: ${filename}`);
            }
        }

        console.log(`${evictionCount} cache files evicted.`);

        return evictionCount;
    }
    /**
     * @public
     * @description
     * Evicts stale pages from the projects cache.
     * 
     * Parses an `IProjectsCache` file first. If it has pages, iterates through all pages and
     * tries each for eviction.
     * 
     * @param {IEvictionOptions} options - Specifies the eviction options.
     *  
     * @returns {Promise<number>} - A promise that resolves to how many cache pages were evicted.
     */
    public async evictStaleCachePages(file: IFile, evictionOptions?: IEvictionOptions): Promise<number> {
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
                console.log(`Evicting page ${pageNumber} from ${file.Filename}`);
                delete cachePageRecord[pageNumber];
                evictedPages++;
            }
        }
        
        try {
            this._jsonFileHandler.writeToJsonFile(file.Filepath, file.Filename, data);
            console.log(`Successfully evicted ${evictedPages} pages from ${file.Filename}`);
            return evictedPages;
        } 
        catch (err) {
            console.error('Error evicting cache pages: ', err);
            return 0;
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