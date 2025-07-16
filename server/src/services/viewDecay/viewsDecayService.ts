import { ICache } from "@viewmodels";
import { JsonFileHandler } from "@services";

type decayFunc<TCache extends ICache> = (cache: TCache, now: Date) => TCache | Promise<TCache>;

/**
 * @class ViewDecayService
 * 
 * @description
 * A service for decaying the view counts on cached files.  
 */
export class ViewsDecayService<TCache extends ICache> {
    /**
     * The directory path where cache JSON files are stored.
     * This is used as the root location for reading and writing cache data during decay processing.
     */
    private readonly _cacheDirectory: string;
    /**
     * @description
     * A value between 0 and 1 that specifies the rate at which view counts decay.
     * The higher the value, the more aggressive the decay.
     */
    private readonly _decayRate: number;
    /**
     * Responsible for reading and writing cache files of type `TCache` within the configured cache directory.
     */
    private readonly _jsonFileHandler: JsonFileHandler<TCache>;
    /**
     * @constructor
     * 
     * @description
     * Constructs a new instance of `ViewsDecayService`. Accepts a parameter decayRate that defaults
     * to 0.5 if the provided value does not satifies the conditions.
     * 
     * @param decayRate - A value between 0 and 1 that specifies the rate at which view counts decay.
     * The higher the value, the more aggressive the decay.
     */
    public constructor (cacheDirectory: string, decayRate: number, modelName: string) {
        this._cacheDirectory = cacheDirectory;

        const isDecayRateValid = decayRate > 0 && decayRate < 1;
        //  set a default decay rate of 0.5 if the provided value is not valid.
        this._decayRate = isDecayRateValid ? decayRate : 0.5;

        this._jsonFileHandler = new JsonFileHandler<TCache>(modelName);
    }

    /**
     * @public 
     * @async
     * @description
     * Decays the view counts of all cache files in a provided directory.
     * Executes the following actions:
     * - Iterates through filenames located in the cache directory.
     * - Parses each file.
     * - Executes the decay function.
     * - Writes the modified cache back into the json file.
     * @param {decayFunc} decayFunc - a function that takes the cache object and a date representing the current time.
     * It decays the view count when executed. If not provided, it defaults to usign {@link defaultDecayFunc}.
     */
    public async decayAllCache(decayFunc?: decayFunc<TCache>) {
        decayFunc = decayFunc ?? this.defaultDecayFunc;

        const now = new Date();

        await this._jsonFileHandler.processFiles(this._cacheDirectory, async (file) => {
            const { Filepath, Filename } = file;
            const cache = await this._jsonFileHandler.parseJsonFile(Filepath, Filename, this.reviver);
            
            if (cache) {
                const decayedCache = await decayFunc(cache, now);

                await this._jsonFileHandler.writeToJsonFile(Filepath, Filename, decayedCache);
            }
        });
    }
    /**
     * @protected
     * @description
     * The default implementation for decaying a cache object's view count.
     * This method is used as the fallback decay strategy in {@link decayAllCache} if no custom
     * decay function is provided. Subclasses may override this method to apply
     * custom decay logic.
     *
     * @param cache - The cache object to be decayed.
     * @param now - The current time used to calculate the decay.
     * @returns The updated cache object with the decayed view count.
     */
    protected defaultDecayFunc(cache: TCache, now: Date) {
        const viewCount = cache.ViewCount;
        const lastAccessed = cache.LastAccessed;

        cache.ViewCount = this.getDecayedViews(viewCount, lastAccessed, now);
        return cache;
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

    /**
     * @protected
     * @description
     * Calculates the decayed view count of a cache based on exponential decay.
     * The ceiling of the result of the calculation is returned.
     * 
     * @param views - the current view count.
     * @param lastAccessed - the Date that the cache was last accessed.
     * @param now - the current Date.
     * @returns the decayed view count rounded up.
     */
    protected getDecayedViews (
        views: number,
        lastAccessed: Date,
        now: Date
    ): number 
    {
        const decayRate = this._decayRate;

        const msPerHour = 1000 * 60 * 60;
        const elapsedTime = (now.valueOf() - lastAccessed.valueOf()) / msPerHour;
        const decayFactor = Math.pow(1 - decayRate, elapsedTime);

        return Math.ceil(views * decayFactor);
    }
}