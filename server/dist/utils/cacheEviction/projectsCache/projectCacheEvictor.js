var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BaseCacheEvictor } from "../baseCacheEvictor.js";
import dotenv from 'dotenv';
dotenv.config();
export class ProjectCacheEvictor extends BaseCacheEvictor {
    constructor(jsonFileHandler, evictionOptions, projectPageEvictor) {
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
    evictStaleCache(evictionOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            let evictionCount = 0;
            const filepath = process.env.PROJECT_CACHE_PATH;
            //  Get filenames from dir
            const filenames = yield this._jsonFileHandler.getDirectoryFilenames(filepath);
            if (filenames.length === 0) {
                console.log('There are no cache files in the directory.');
                return 0;
            }
            //  Try each file for eviction.
            for (const filename of filenames) {
                const file = {
                    Filepath: filepath,
                    Filename: filename
                };
                const isEvicted = yield this.tryEvict(file, evictionOptions);
                if (isEvicted) {
                    evictionCount++;
                    console.log(`Evicted file no. ${evictionCount}: ${filename}`);
                }
            }
            console.log(`${evictionCount} cache files evicted.`);
            return evictionCount;
        });
    }
    /**
     * @public
     * @description
     * Evicts stale pages from the projects cache.
     *
     * @param {IEvictionOptions} options - Specifies the eviction options.
     *
     * @returns {Promise<number>} - A promise that resolves to how many cache pages were evicted.
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
        });
    }
}
