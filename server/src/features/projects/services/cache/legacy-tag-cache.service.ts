import dotenv from "dotenv";
import { JsonFileService, createJsonFileService } from "@services";
import { CACHE } from "@/data";
import { IProjectTagsCache } from "../../types";

dotenv.config();

const TAGS_CACHE = CACHE.TAGS_CACHE;
const AS_JSON = CACHE.EXTENSION.JSON;

export function createLegacyTagsCacheHandler() {
  const jsonFileHandlerInstance =
    createJsonFileService<IProjectTagsCache>("IProjectTags");
  return new LegacyTagsCacheHandler(jsonFileHandlerInstance);
}

/**
 * @deprecated Please use TagsCacheService
 */
export class LegacyTagsCacheHandler {
  private readonly _jsonFileHandler: JsonFileService<IProjectTagsCache>;
  private readonly _filepath: string;
  private readonly _filename: string;
  private _tagsCache: IProjectTagsCache | null = null;

  public constructor(jsonFileHandler: JsonFileService<IProjectTagsCache>) {
    this._jsonFileHandler = jsonFileHandler;
    this._filepath = process.env.TAGS_CACHE_PATH!;
    this._filename = TAGS_CACHE.BASE_NAME + AS_JSON;
  }

  public async getDevTypes() {
    this._tagsCache = await this.getTagsCache();
    return this._tagsCache?.devTypes ?? null;
  }

  public async getProgrammingLanguages() {
    const data = await this.getTagsCache();
    return data?.programmingLanguages ?? null;
  }

  public async getFrameworks() {
    const data = await this.getTagsCache();
    return data?.frameworks ?? null;
  }

  public async getDatabaseTechnologies() {
    const data = await this.getTagsCache();
    return data?.databaseTechnologies ?? null;
  }

  public async getApplicationIndustries() {
    const data = await this.getTagsCache();
    return data?.applicationIndustries ?? null;
  }

  public async getTagsCache() {
    return this._tagsCache ? this._tagsCache : await this.parseTagsCache();
  }

  private async parseTagsCache() {
    return await this._jsonFileHandler.parseJsonFile(
      this._filepath,
      this._filename
    );
  }
}
