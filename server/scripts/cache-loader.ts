import { CACHE } from "@data";
import { createJsonFileService } from "@services";
import { IProjectTagsCache } from "@/features/projects/types";
import { createContext } from "@/db/csods";
import dotenv from "dotenv";
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
  const data: IProjectTagsCache = {
    devTypes: [],
    programmingLanguages: [],
    frameworks: [],
    databaseTechnologies: [],
    applicationIndustries: [],
  };

  const context = await createContext();

  data.devTypes = await context.query.DevType.findMany();
  data.programmingLanguages =
    await context.query.ProgrammingLanguage.findMany();
  data.frameworks = await context.query.Framework.findMany();
  data.databaseTechnologies = await context.query.DatabaseTechnology.findMany();
  data.applicationIndustries =
    await context.query.ApplicationIndustry.findMany();

  const jsonFileHandler =
    createJsonFileService<IProjectTagsCache>("IProjectTags");
  const fileName = CACHE.TAGS_CACHE.BASE_NAME + CACHE.EXTENSION.JSON;
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
