import { IProjectTags } from "../viewmodels/cache/cacheInterfaces.js";
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
async function tagsLoader() {
    const data: IProjectTags = {
        DevTypes: [],
        ProgrammingLanguages: [],
        Frameworks: [],
        DatabaseTechnologies: [],
        ApplicationIndustries: []
    };

    const context = await createContext();
    
    data.DevTypes = await context.query.DevTypes.findMany();
    data.ProgrammingLanguages = await context.query.ProgrammingLanguages.findMany();
    data.Frameworks = await context.query.Frameworks.findMany();
    data.DatabaseTechnologies = await context.query.DatabaseTechnologies.findMany();
    data.ApplicationIndustries = await context.query.ApplicationIndustry.findMany();

    const jsonFileHandler = createJsonFileHandler<IProjectTags>('IProjectTags');
    const fileName = CACHE.TAGS_CACHE + CACHE.AS_JSON;
    await jsonFileHandler.writeToJsonFile(process.env.TAGS_CACHE_PATH!, fileName, data);
    const dataRead = await jsonFileHandler.parseJsonFile(process.env.TAGS_CACHE_PATH!, fileName);
}

tagsLoader();
