var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createJsonFileHandler } from "../../file/fileHandler.js";
import { BaseCacheEvictor } from "../baseCacheEvictor.js";
import dotenv from 'dotenv';
import { createProjectPageEvictor } from "./projectPageEvictor.js";
dotenv.config();
export function createProjectCacheEvictor(cacheEvictionOptions, pageEvictionOptions) {
    const jsonFileHandler = createJsonFileHandler('IProjectCache');
    const pageEvictorInstance = createProjectPageEvictor(pageEvictionOptions);
    const cacheEvictorInstance = new ProjectCacheEvictor(jsonFileHandler, cacheEvictionOptions, pageEvictorInstance);
    return cacheEvictorInstance;
}
export class ProjectCacheEvictor extends BaseCacheEvictor {
    constructor(jsonFileHandler, evictionOptions, projectPageEvictor) {
        super(jsonFileHandler, evictionOptions);
        this._cacheDirectory = process.env.PROJECT_CACHE_PATH;
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
    evictStaleCache(evictionOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            let evictionCount = 0;
            yield this.processCacheFiles(this._cacheDirectory, (file) => __awaiter(this, void 0, void 0, function* () {
                const isEvicted = yield this.tryEvict(file, evictionOptions);
                if (isEvicted) {
                    evictionCount++;
                    console.log(`Evicted file no. ${evictionCount}: ${file.Filename}`);
                }
            }));
            return evictionCount;
        });
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
    evictPagesFromCaches(evictionOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            let totalEvictedPages = 0;
            yield this.processCacheFiles(this._cacheDirectory, (file) => __awaiter(this, void 0, void 0, function* () {
                const evictedPages = yield this.evictStaleCachePages(file, evictionOptions);
                totalEvictedPages += evictedPages;
            }));
            return totalEvictedPages;
        });
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
    evictStaleCachePages(file, evictionOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let evictedPages = 0;
            const data = yield this.readFile(file);
            const cachePageRecord = (_a = data === null || data === void 0 ? void 0 : data.CachePages) !== null && _a !== void 0 ? _a : {};
            const pageEntries = Object.entries(cachePageRecord);
            const hasPages = pageEntries.length > 0;
            if (!hasPages) {
                console.log(`Cache ${file.Filename} has no pages.`);
                return 0;
            }
            for (const pageEntry of pageEntries) {
                const pageNumber = Number(pageEntry[0]);
                const page = pageEntry[1];
                const isEvictPage = yield this._projectPageEvictor.isEvict(page, evictionOptions);
                if (isEvictPage) {
                    delete cachePageRecord[pageNumber];
                    evictedPages++;
                }
            }
            try {
                yield this._jsonFileHandler.writeToJsonFile(file.Filepath, file.Filename, data);
                console.log(`Successfully evicted ${evictedPages} pages from ${file.Filename}`);
                return evictedPages;
            }
            catch (err) {
                console.error('Error evicting cache pages: ', err);
                return 0;
            }
        });
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
    processCacheFiles(directory, func) {
        return __awaiter(this, void 0, void 0, function* () {
            const filenames = yield this._jsonFileHandler.getDirectoryFilenames(directory);
            if (filenames.length === 0) {
                console.log('There are no cache files in the directory.');
                return;
            }
            for (const filename of filenames) {
                const file = {
                    Filepath: this._cacheDirectory,
                    Filename: filename
                };
                yield func(file);
            }
        });
    }
}
