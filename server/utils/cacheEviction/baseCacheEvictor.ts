import { ICache } from "../../viewmodels/cache/cacheInterfaces.js";
import { JsonFileHandler, IFile } from "../file/fileHandler.js";


export class BaseCacheEvictor<TCache extends ICache> {
    protected readonly _jsonFileHandler: JsonFileHandler<TCache>;
    protected _defaultEvictionOptions: IEvictionOptions;

    public constructor(
        jsonFileHandler: JsonFileHandler<TCache>, 
        defaultEvictionOptions: IEvictionOptions
    ) 
    {
        this._jsonFileHandler = jsonFileHandler;
        this._defaultEvictionOptions = this.normalizeEvictionOptions(defaultEvictionOptions);
    }
    /**
     * @public
     * @description Forcefully evicts a cache from memory.
     * Possible use for cron jobs or custom eviction criteria more complex than what the eviction options
     * can handle.
     * 
     * @param {IFile} file - The file's path and directory.
     * @returns {boolean} - Returns true if the file is successfully deleted, false otherwise.
     */
    public async forceEvict(file: IFile): Promise<boolean> {
        return await this.deleteFile(file);
    }
    //#region tryEvict logic
    /**
     * @public
     * @description Attempts to read then evict a cache with an optional evictionOptions parameter.
     * If the cache exists and is not null, check if it's current state satisfies the eviction
     * conditions. If it does, delete the file.
     * 
     * @param {IFile} file - The file's path and directory.
     * @param {IEvictionOptions} evictionOptions - see IEvictionOptions for details.
     * @returns {boolean} True if the file is sucessfully evicted, false if not or if the data is null.
     */
    public async tryEvict(file: IFile, evictionOptions?: IEvictionOptions): Promise<boolean> {
        const data = await this.readFile(file);

        if(data && await this.isEvict(data, evictionOptions)) {
            return await this.deleteFile(file);
        }
        return false;
    }
    /**
     * @protected
     * @description Helper function for reading a file with a provided filepath and filename throug
     * JsonFileHandler.
     * 
     * @param {IFile} file - The file's path and directory.
     * @returns {Promise<TCache | null>} - A promise that resolves to the data inside the file if
     * successfully read, null otherwise.
     */
    protected async readFile(file: IFile): Promise<TCache | null> {
        const filepath = file.Filepath;
        const filename = file.Filename;

        const data = await this._jsonFileHandler
            .parseJsonFile(
                filepath, 
                filename, 
                this.reviver
            );

        return data;
    }
    /**
     * @protected
     * @description Revives certain fields (e.g., converts 'CreatedOn' string back into a Date).
     *
     * @param {string} key - The property name.
     * @param {any} value - The property value.
     * @returns {any} The transformed value.
     */
    protected reviver(key: string, value: any) {
        const isDateKey = key === 'CreatedOn' || key === 'LastAccessed';
        if (isDateKey && typeof value === 'string') {
            return new Date(value);
        }
        return value;
    }

    //#region eviction verification
    /**
     * @public
     * @description Verifies if the data is up for eviction with an optional evictionOptions parameter.
     * If the evictionOptions is not specified, the default evictionOptions provided will be used.
     * 
     * @param {TCache} data - The data subject to eviction.
     * @param {IEvictionOptions} evictionOptions - The eviction options to be used for determining if data is up for eviction.
     * 
     * Contains the following fields:
     * - `Strategy` - The eviction strategy.
     * - `Duration` - Specifies the duration in milliseconds before the next eviction.
     * - `Granularity` - Specifies how often the program checks if the data is up for eviction.
     * - `Threshold` - Specifies the minimum views that the data must have in order to avoid eviction.
     * @returns - True if data is up for eviction, false if not or if an unknown eviction strategy is
     * used in the evictionOptions.
     */
    public async isEvict(data: TCache, evictionOptions?: IEvictionOptions): Promise<boolean> {
        evictionOptions = this.normalizeEvictionOptions(evictionOptions);

        const strategy = evictionOptions.Strategy;
        switch (strategy) {
            case 'ttl':
                console.log('Verifying if cache is up for eviction by ttl strategy.');
                return this.verifyEvictByTtl(data, evictionOptions);
            case 'lfu':
                console.log('Verifying if cache is up for eviction by lfu strategy.');
                return this.verifyEvictByLfu(data, evictionOptions);
            default:
                console.warn(`Unknown eviction strategy: ${evictionOptions.Strategy}`);
                return false;
        }
    }
    /**
     * @protected
     * @description Normalizes the provided eviction options, applying default values where unassigned.
     * 
     * @param {IEvictionOptions} [evictionOptions] - The eviction options to normalize. If not provided,
     * the method uses `this._defaultEvictionOptions` as the base.
     * @returns {IEvictionOptions} The normalized eviction options.
     */
    protected normalizeEvictionOptions(evictionOptions?: IEvictionOptions): IEvictionOptions {
        const base = evictionOptions ?? this._defaultEvictionOptions;
        return {
            Strategy: base.Strategy,
            Duration: base.Duration ?? 1000 * 60 * 60 * 24, //  default 1 day.
            Granularity: base.Granularity ?? 1000 * 60 * 60 * 24,   //  default 1 day.
            ViewThreshold: base.ViewThreshold ?? 5  //  default 5 views.
        }
    }
    /**
     * @protected
     * @description Verifies if a cache entry should be evicted based on the Time-to-Live (TTL) strategy.
     * 
     * @param {TCache} data - The cache entry to check. It is assumed that `data` has a `LastAccessed` property which is a Date object.
     * @param {IEvictionOptions} evictionOptions - The eviction options, specifically expecting `Duration` to be defined for this strategy.
     * @returns {boolean} `true` if the cache entry has expired based on its last access time and the configured duration, `false` otherwise.
     */
    protected verifyEvictByTtl(data: TCache, evictionOptions: IEvictionOptions): boolean {
        const now = new Date().valueOf();
        const isExpired = (now - data.LastAccessed.valueOf()) > evictionOptions.Duration!
        return isExpired;
    }
    /**
     * @protected
     * @description Verifies if a cache entry should be evicted based on the Least Frequently Used (LFU) strategy.
     * 
     * @param {TCache} data - The cache entry to check.
     * @param {IEvictionOptions} evictionOptions - The eviction options.
     * @returns {boolean} `true` if the cache entry should be evicted based on LFU criteria, `false` otherwise.
     * @todo Implement the LFU eviction logic based on `data`'s view count and `evictionOptions.ViewThreshold`.
     */
    protected verifyEvictByLfu(data: TCache, evictionOptions: IEvictionOptions): boolean {
        //  to follow.
        return false;
    }
    //#endregion eviction verification

    //#endregion tryEvict Logic

    /**
     * @protected
     * @description Helper function for deleting a file and improved readabiltiy.
     * 
     * @param {IFile} file - The file's path and name used for identifying the file to be deleted.
     * @returns {boolean} True if the file is successfully deleted, false if not.
     */
    protected async deleteFile(file: IFile) : Promise<boolean>
    {
        const filepath = file.Filepath;
        const filename = file.Filename;
        return await this._jsonFileHandler.deleteJsonFile(filepath, filename);
    }
}
/**
 * @interface IEvictionOptions
 * @description Defines options for cache eviction strategies.
 */
export interface IEvictionOptions {
    /**
     * The eviction strategy.
     * 
     * Possible values include
     * - `ttl` - Time to live.
     * - `lfu` - Least frequently used.
     */
    Strategy: 'ttl' | 'lfu',
    /**
     * Used for both ttl and lfu.
     * Specifies the duration in milliseconds before the next eviction.
     */
    Duration?: number,
    /**
     * Used for both ttl and lfu.
     * Specifies the duration before the next check if the data is up for eviction.
     */
    Granularity?: number,
    /**
     * Used for lfu.
     * Specifies the threshold of the minimum possible viewcount of which the cache will be evicted
     * if it goes below it.
     */
    ViewThreshold?: number
}