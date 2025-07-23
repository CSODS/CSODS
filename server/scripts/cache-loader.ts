import { CONSTANTS } from "@data";
import { createJsonFileHandler } from "@services";
import { IProjectTags } from "@viewmodels";
import { createContext } from "@/db/csods";
import dotenv from "dotenv";
dotenv.config();

const CACHE = CONSTANTS.CACHE;

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
    ApplicationIndustries: [],
  };

  const context = await createContext();

  data.DevTypes = await context.query.DevType.findMany();
  data.ProgrammingLanguages =
    await context.query.ProgrammingLanguage.findMany();
  data.Frameworks = await context.query.Framework.findMany();
  data.DatabaseTechnologies = await context.query.DatabaseTechnology.findMany();
  data.ApplicationIndustries =
    await context.query.ApplicationIndustry.findMany();

  const jsonFileHandler = createJsonFileHandler<IProjectTags>("IProjectTags");
  const fileName = CACHE.TAGS_CACHE + CACHE.AS_JSON;
  await jsonFileHandler.writeToJsonFile(
    process.env.TAGS_CACHE_PATH!,
    fileName,
    data
  );
  const dataRead = await jsonFileHandler.parseJsonFile(
    process.env.TAGS_CACHE_PATH!,
    fileName
  );
}

tagsLoader();
