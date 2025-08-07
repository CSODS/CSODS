import winston from "winston";
import { CACHE } from "@/data";
import { ICache } from "@/viewmodels";
import { JsonError, JsonFileService } from "../json-file-service";
import { CacheError } from "./abstract-cache-service.error";
import { MethodLogParams } from "./abstract-cache-service.types";

/**
 * @abstract
 * @class
 * @description An abstract class to be used for caching services.
 * Provides CRUD methods for with default behaviors for `json` cache handling.
 * Contains the following fields:
 * - {@link _logger} - An instance of {@link winston.Logger}. Used for logging.
 * - {@link _jsonFileService} - An instance of the {@link JsonFileService}
 * class. A core component for the default CRUD operations of the cache service.
 * - {@link _cachePath} - The path to the cache folder.
 * - {@link _filename} - The filename of the cache. `cache.json` by default.
 * - {@link _cache} - The in-memory reference of the {@link ICache} object
 * loaded from the cache. `null` by default.
 */
export abstract class AbstractCacheService<TCache extends ICache> {
  protected readonly _logger: winston.Logger;
  protected readonly _jsonFileService: JsonFileService<TCache>;
  protected _cachePath: string;
  protected _filename: string = "cache.json";
  protected _cache: TCache | null = null;

  /**
   * @constructor
   * @description The constructor. Accepts parameters of type
   * {@link winston.Logger}, {@link JsonFileService}, and {@link string}.
   * @param logger - An instance of {@link winston.Logger}. Used for logging.
   * @param jsonFileService - An instance of the {@link JsonFileService} class.
   * A core component for the default CRUD operations of the cache service.
   * @param cachePath - The path to the cache folder.
   */
  public constructor(
    logger: winston.Logger,
    jsonFileService: JsonFileService<TCache>,
    cachePath: string
  ) {
    this._logger = logger;
    this._jsonFileService = jsonFileService;
    this._cachePath = cachePath;
  }

  public getCache(): TCache | null {
    return this._cache;
  }

  public getLastAccessed(): Date | null {
    return this._cache?.lastAccessed ?? null;
  }

  public setCachePath(newCachePath: string): string {
    this._logger.debug(`[setCachePath] Setting cache path to: ${newCachePath}`);
    this._cachePath = newCachePath;
    return this._cachePath;
  }

  public setFilename(newFilename: string): string {
    this._logger.debug(`[setFilename] Setting filename to: ${newFilename}`);
    this._filename = newFilename;
    return this._filename;
  }

  /**
   * @async
   * @description Asynchronously loads the cache into memory. The successfully
   * loaded cache is validated then stored interally in {@link _cache} and
   * returned.
   * @returns A `Promise` that resolves to the loaded cache.
   * @throws {CacheError} Thrown with `name`:
   * - `"CACHE_PARSE_ERROR"`
   * - `"INVALID_CACHE_ERROR"`
   */
  public async loadCache(): Promise<TCache> {
    this._logger.info("[setCache] Loading cache into memory...");

    //  !Throws CacheError: CACHE_PARSE_ERROR on parse operation fail.
    const cache: TCache = await this.tryParseCache();

    if (!this.isCacheValid(cache)) {
      this._logger.info("[loadCache] Failed loading cache into memory.");
      throw new CacheError({
        name: "INVALID_CACHE_ERROR",
        message: "Invalid cache object.",
      });
    }

    this._logger.info("[loadCache] Success loading cache into memory.");
    this._cache = cache;
    return cache;
  }
  /**
   * @description Attempts to store data into the cache, validating it with
   * {@link isCacheValid} first, then writing it into the cache.
   *
   * @param data The data to be stored into cache.
   * @returns A `Promise` that resolves to the newly created {@link ICache}
   * object.
   * @throws {CacheError} Thrown with `name:`
   * - `"INVALID_CACHE_ERROR"` if the data fails validation via {@link isCacheValid}
   * - `"CACHE_PERSIST_ERROR"`
   */
  public async persistCache(data: TCache): Promise<TCache> {
    const { _cachePath, _filename, _logger } = this;
    const fullPath = _cachePath + _filename;

    try {
      _logger.info(
        `[persistCache] Attempting to store data into cache at ${fullPath}...`
      );

      if (!this.isCacheValid(data))
        throw new CacheError({
          name: "INVALID_CACHE_ERROR",
          message: "Invalid cache",
        });

      const storedCache = await this._jsonFileService.writeToJsonFile(
        _cachePath,
        _filename,
        data
      );

      _logger.info("[persistCache] Success storing data into cache.");

      return storedCache;
    } catch (err) {
      _logger.error("[persistCache] Failed storing data into cache.", err);

      if (err instanceof CacheError) throw err;
      throw new CacheError({
        name: "CACHE_PERSIST_ERROR",
        message: "Failed storing data into cache.",
        cause: err,
      });
    }
  }

  /**
   * @description Wrapper method for {@link JsonFileService}'s
   * `generateFilename` method.
   * @param nameElements
   * @returns
   */
  public generateCacheFilename(...nameElements: string[]) {
    const { JSON: jsonExt } = CACHE.EXTENSION;
    return this._jsonFileService.generateFileName(jsonExt, ...nameElements);
  }

  /**
   * @description Wrapper method for {@link JsonFileService} `asssertDataNotNull`
   * method.
   * @param cache The cache to check.
   * @throws {JsonError} Thrown with `name: "NULL_DATA_ERROR"`.
   */
  public assertCacheNotNull(cache: TCache | null): asserts cache is TCache {
    this._jsonFileService.assertDataNotNull(cache);
  }

  /**
   * @async
   * @description Asynchronously attempts to parse a JSON cache file. Utilizes
   * a helper function `reviver` for reviving `Date` type fields.
   *
   * @returns A `Promise` that resolves to the parsed `cache` object.
   * @throws {CacheError} Thrown with `name: "CACHE_PARSE_ERROR"`.
   * @remarks
   * If the shape of the `cache` object has fields in need of a reviver other
   * than the default provided fields in {@link reviver}, reviver must be
   * overriden.
   */
  protected async tryParseCache(): Promise<TCache> {
    const { _cachePath, _filename, _logger } = this;
    const fullPath = _cachePath + _filename;

    try {
      _logger.info(
        `[tryParseCache] Attempting to parse cache at ${fullPath}...`
      );

      const parsedCache = await this._jsonFileService.parseJsonFile(
        _cachePath,
        _filename,
        this.reviver
      );

      _logger.info(`[tryParseCache] Success parsing cache.`);

      return parsedCache;
    } catch (err) {
      _logger.error(`[tryParseCache] Failed parsing cache.`, err);
      throw new CacheError({
        name: "CACHE_PARSE_ERROR",
        message: "Failed parsing cache.",
        cause: err,
      });
    }
  }

  /**
   * @protected
   * @description Revives stringified dates in cache files.
   *
   * Converts fields like `createdOn` and `lastAccessed` to `Date` instances.
   *
   * Override if the cache shape requires custom reviving logic
   *
   * @param key - The property name.
   * @param value - The property value.
   * @returns - The transformed value.
   */
  protected reviver(key: string, value: any) {
    const isDateKey = key === "createdOn" || key === "lastAccessed";
    if (isDateKey && typeof value === "string") return new Date(value);
    return value;
  }

  /**
   * @protected
   * @description Checks if the {@link ICache} object is valid.
   *
   * @param cache - The {@link ICache} object to be validated.
   * @returns `true` if the cache is valid, `false` otherwise.
   *
   * @remarks
   * Subclasses may override this method if additional validation logic is
   * needed.
   */
  protected isCacheValid(cache: TCache | null): boolean {
    return !!cache;
  }

  /**
   * @virtual
   * @description Logging helper function. Override for parameter type for
   * child classes as necessary.
   * @param level The log level.
   * @param method The method name. Derived from the keys of the class.
   * @param message The log message.
   */
  protected __log({
    level,
    method,
    message,
  }: MethodLogParams<AbstractCacheService<TCache>>) {
    const logMsg = `[${method}] ${message}`;
    this._logger.log(level, logMsg);
  }
}
