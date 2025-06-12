var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createJsonFileHandler } from "../utils/file/fileHandler.js";
import { createContext } from "../db/csods.js";
import { CACHE } from "../data/constants/constants.js";
import dotenv from 'dotenv';
dotenv.config();
/**
 * @typedef {object} IProjectTags
 * @property {Array<Object>} DevTypes - Developer types.
 * @property {Array<Object>} ProgrammingLanguages - Programming languages.
 * @property {Array<Object>} Frameworks - Frameworks.
 * @property {Array<Object>} DatabaseTechnologies - Database technologies.
 * @property {Array<Object>} ApplicationIndustries - Application industries.
 */
/**
 * Loads and caches project tags from the database.
 * @async
 * @function tagsLoader
 * @returns {Promise<void>}
 */
function tagsLoader() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            DevTypes: [],
            ProgrammingLanguages: [],
            Frameworks: [],
            DatabaseTechnologies: [],
            ApplicationIndustries: []
        };
        const context = yield createContext();
        data.DevTypes = yield context.query.DevTypes.findMany();
        data.ProgrammingLanguages = yield context.query.ProgrammingLanguages.findMany();
        data.Frameworks = yield context.query.Frameworks.findMany();
        data.DatabaseTechnologies = yield context.query.DatabaseTechnologies.findMany();
        data.ApplicationIndustries = yield context.query.ApplicationIndustry.findMany();
        const jsonFileHandler = createJsonFileHandler('IProjectTags');
        const fileName = CACHE.TAGS_CACHE + CACHE.AS_JSON;
        yield jsonFileHandler.writeToJsonFile(process.env.TAGS_CACHE_PATH, fileName, data);
        const dataRead = yield jsonFileHandler.parseJsonFile(process.env.TAGS_CACHE_PATH, fileName);
    });
}
tagsLoader();
