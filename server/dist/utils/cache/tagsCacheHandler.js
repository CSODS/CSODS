var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createJsonFileHandler } from "../file/fileHandler.js";
import { CACHE } from "../../data/constants/constants.js";
import dotenv from 'dotenv';
dotenv.config();
export function createTagsCacheHandler() {
    const jsonFileHandlerInstance = createJsonFileHandler('IProjectTags');
    return new TagsCacheHandler(jsonFileHandlerInstance);
}
export class TagsCacheHandler {
    constructor(jsonFileHandler) {
        this._tagsCache = null;
        this._jsonFileHandler = jsonFileHandler;
        this._filepath = process.env.TAGS_CACHE_PATH;
        this._filename = CACHE.TAGS_CACHE + CACHE.AS_JSON;
    }
    getDevTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            this._tagsCache = yield this.getTagsCache();
            return (_b = (_a = this._tagsCache) === null || _a === void 0 ? void 0 : _a.DevTypes) !== null && _b !== void 0 ? _b : null;
        });
    }
    getProgrammingLanguages() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const data = yield this.getTagsCache();
            return (_a = data === null || data === void 0 ? void 0 : data.ProgrammingLanguages) !== null && _a !== void 0 ? _a : null;
        });
    }
    getFrameworks() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const data = yield this.getTagsCache();
            return (_a = data === null || data === void 0 ? void 0 : data.Frameworks) !== null && _a !== void 0 ? _a : null;
        });
    }
    getDatabaseTechnologies() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const data = yield this.getTagsCache();
            return (_a = data === null || data === void 0 ? void 0 : data.DatabaseTechnologies) !== null && _a !== void 0 ? _a : null;
        });
    }
    getApplicationIndustries() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const data = yield this.getTagsCache();
            return (_a = data === null || data === void 0 ? void 0 : data.ApplicationIndustries) !== null && _a !== void 0 ? _a : null;
        });
    }
    getTagsCache() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._tagsCache ? this._tagsCache : yield this.parseTagsCache();
        });
    }
    parseTagsCache() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._jsonFileHandler.parseJsonFile(this._filepath, this._filename);
        });
    }
}
