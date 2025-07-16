import { JsonFileHandler, IFile } from "@services";
import { ICache } from "@viewmodels";

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
            case 'ttl+lfu':
                console.log('Verifying if cache is up for eviction by ttl+lfu strategy.');
                const isEvictByTtl = this.verifyEvictByTtl(data, evictionOptions);
                const isEvictByLfu = this.verifyEvictByLfu(data, evictionOptions);
                const isEvictFinal = isEvictByTtl && isEvictByLfu;
                return isEvictFinal;
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
     * @description 
     * Determines whether a cache entry should be evicted based on the Time-to-Live (TTL) strategy.
     * 
     * This method checks if the time elapsed since the entry's `LastAccessed` timestamp exceeds
     * the specified TTL duration. If either the timestamp is invalid or the eviction options
     * are malformed, the method defaults to evicting the entry as a fail-safe.
     * 
     * @param {TCache} data - The cache entry to check. It is assumed that `data` has a `LastAccessed` property which is a Date object.
     * @param {IEvictionOptions} evictionOptions - The eviction options, specifically expecting `Duration` to be defined for this strategy.
     * @returns {boolean} `true` if the cache entry has expired based on its last access time and the configured duration, `false` otherwise.
     */
    protected verifyEvictByTtl(data: TCache, evictionOptions: IEvictionOptions): boolean {
        const { LastAccessed } = data;
        const { Duration } = evictionOptions;

        if (!LastAccessed || !(LastAccessed instanceof Date) || typeof Duration !== 'number') {
            //  Fail-safe for invalid date in the cache or malformed eviction options.
            return true;
        }

        const now = new Date().valueOf();
        const isExpired = (now - LastAccessed.valueOf()) > Duration;
        return isExpired;
    }
    /**
     * @protected
     * @description
     * Determines whether a cache entry should be evicted based on the Least Frequently Used (LFU) strategy.
     * 
     * This method checks if the entry's view count is less than or equal to the configured `ViewThreshold`.
     * If the view count is missing or the eviction options are malformed, the entry will be evicted by default
     * as a safety measure.
     * 
     * @param {TCache} data - The cache entry to evaluate. Must include a numeric `ViewCount` property.
     * @param {IEvictionOptions} evictionOptions - The LFU eviction options. Must include a numeric `ViewThreshold`.
     * 
     * @returns {boolean} `true` if the entry should be evicted based on view count or due to invalid inputs, `false` otherwise.
     */
    protected verifyEvictByLfu(data: TCache, evictionOptions: IEvictionOptions): boolean {
        const { ViewCount } = data;
        const { ViewThreshold } = evictionOptions;

        if (typeof ViewCount !== 'number' || typeof ViewThreshold !== 'number') {
            //  Fail-safe for invalid view count in the cache or malformed eviction options.
            return true;
        }
        const isLfu = ViewCount <= ViewThreshold;
        return isLfu;
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
 * 
 * Fields:
 * - `Strategy` (required): Determines the eviction strategy to use.
 *    - `'ttl'` (Time-To-Live): Evicts items older than a specified duration.
 *    - `'lfu'` (Least Frequently Used): Evicts items with low usage frequency.
 *    - `ttl+lfu` (Time-To-Live + Least Frequently Used) - Combination of ttl and lfu.
 * 
 * - `Duration` (optional): Used in both `ttl` and `lfu`. Specifies the duration (in milliseconds)
 *   before an item becomes eligible for eviction.
 * 
 * - `Granularity` (optional): Used in both `ttl` and `lfu`. Specifies how often (in milliseconds)
 *   eviction checks are performed.
 * 
 * - `ViewThreshold` (optional): Used only in `lfu`. Sets the minimum view count threshold—items
 *   below this value may be evicted.
 */
export interface IEvictionOptions {
    /**
     * The eviction strategy.
     * 
     * Possible values include
     * - `ttl` - Time to live.
     * - `lfu` - Least frequently used.
     * - `ttl+lfu` - Combination of ttl and lfu.
     */
    Strategy: 'ttl' | 'lfu' | 'ttl+lfu',
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