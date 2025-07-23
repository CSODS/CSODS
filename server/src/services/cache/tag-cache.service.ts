import dotenv from "dotenv";
import { JsonFileService, createJsonFileService } from "@services";
import { IProjectTags } from "@viewmodels";
import { CONSTANTS } from "@/data";

dotenv.config();

const CACHE = CONSTANTS.CACHE;

export function createTagsCacheHandler() {
  const jsonFileHandlerInstance =
    createJsonFileService<IProjectTags>("IProjectTags");
  return new TagsCacheHandler(jsonFileHandlerInstance);
}

export class TagsCacheHandler {
  private readonly _jsonFileHandler: JsonFileService<IProjectTags>;
  private readonly _filepath: string;
  private readonly _filename: string;
  private _tagsCache: IProjectTags | null = null;

  public constructor(jsonFileHandler: JsonFileService<IProjectTags>) {
    this._jsonFileHandler = jsonFileHandler;
    this._filepath = process.env.TAGS_CACHE_PATH!;
    this._filename = CACHE.TAGS_CACHE + CACHE.AS_JSON;
  }

  public async getDevTypes() {
    this._tagsCache = await this.getTagsCache();
    return this._tagsCache?.DevTypes ?? null;
  }

  public async getProgrammingLanguages() {
    const data = await this.getTagsCache();
    return data?.ProgrammingLanguages ?? null;
  }

  public async getFrameworks() {
    const data = await this.getTagsCache();
    return data?.Frameworks ?? null;
  }

  public async getDatabaseTechnologies() {
    const data = await this.getTagsCache();
    return data?.DatabaseTechnologies ?? null;
  }

  public async getApplicationIndustries() {
    const data = await this.getTagsCache();
    return data?.ApplicationIndustries ?? null;
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
