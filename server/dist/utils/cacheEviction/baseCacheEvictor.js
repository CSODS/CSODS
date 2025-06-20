var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class BaseCacheEvictor {
    constructor(jsonFileHandler, defaultEvictionOptions) {
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
    forceEvict(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.deleteFile(file);
        });
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
    tryEvict(file, evictionOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.readFile(file);
            if (data && (yield this.isEvict(data, evictionOptions))) {
                return yield this.deleteFile(file);
            }
            return false;
        });
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
    readFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const filepath = file.Filepath;
            const filename = file.Filename;
            const data = yield this._jsonFileHandler
                .parseJsonFile(filepath, filename, this.reviver);
            return data;
        });
    }
    /**
     * @protected
     * @description Revives certain fields (e.g., converts 'CreatedOn' string back into a Date).
     *
     * @param {string} key - The property name.
     * @param {any} value - The property value.
     * @returns {any} The transformed value.
     */
    reviver(key, value) {
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
    isEvict(data, evictionOptions) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    /**
     * @protected
     * @description Normalizes the provided eviction options, applying default values where unassigned.
     *
     * @param {IEvictionOptions} [evictionOptions] - The eviction options to normalize. If not provided,
     * the method uses `this._defaultEvictionOptions` as the base.
     * @returns {IEvictionOptions} The normalized eviction options.
     */
    normalizeEvictionOptions(evictionOptions) {
        var _a, _b, _c;
        const base = evictionOptions !== null && evictionOptions !== void 0 ? evictionOptions : this._defaultEvictionOptions;
        return {
            Strategy: base.Strategy,
            Duration: (_a = base.Duration) !== null && _a !== void 0 ? _a : 1000 * 60 * 60 * 24, //  default 1 day.
            Granularity: (_b = base.Granularity) !== null && _b !== void 0 ? _b : 1000 * 60 * 60 * 24, //  default 1 day.
            ViewThreshold: (_c = base.ViewThreshold) !== null && _c !== void 0 ? _c : 5 //  default 5 views.
        };
    }
    /**
     * @protected
     * @description Verifies if a cache entry should be evicted based on the Time-to-Live (TTL) strategy.
     *
     * @param {TCache} data - The cache entry to check. It is assumed that `data` has a `LastAccessed` property which is a Date object.
     * @param {IEvictionOptions} evictionOptions - The eviction options, specifically expecting `Duration` to be defined for this strategy.
     * @returns {boolean} `true` if the cache entry has expired based on its last access time and the configured duration, `false` otherwise.
     */
    verifyEvictByTtl(data, evictionOptions) {
        const now = new Date().valueOf();
        const isExpired = (now - data.LastAccessed.valueOf()) > evictionOptions.Duration;
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
    verifyEvictByLfu(data, evictionOptions) {
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
    deleteFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const filepath = file.Filepath;
            const filename = file.Filename;
            return yield this._jsonFileHandler.deleteJsonFile(filepath, filename);
        });
    }
}
