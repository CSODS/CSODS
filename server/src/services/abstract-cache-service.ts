import winston from "winston";
import { CACHE } from "@/data";
import { CacheIO } from "@/error";
import { getMethodLoggers, MethodLoggers } from "@/utils";
import { StoreBase } from "@/viewmodels";
import { JsonService } from "./json-file-service";

/**
 * @abstract
 * @class
 * @description An abstract class to be used for caching services.
 * Provides CRUD methods for with default behaviors for `json` cache handling.
 * Contains the following fields:
 * - {@link _logger} - An instance of {@link winston.Logger}. Used for logging.
 * - {@link _jsonFileService} - An instance of the {@link JsonService}
 * class. A core component for the default CRUD operations of the cache service.
 * - {@link _cachePath} - The path to the cache folder.
 * - {@link _filename} - The filename of the cache. `"cache.json"` by default.
 * - {@link _cache} - The in-memory reference of the {@link StoreBase} object
 * loaded from the cache. `null` by default.
 */
export abstract class AbstractCacheService<
  TStore extends StoreBase,
  TSelf extends AbstractCacheService<TStore, TSelf>
> {
  /**
   * @deprecated Please use new _log field
   */
  protected readonly _logger: winston.Logger;
  /**
   * @see getMethodLoggers for detailed description.
   */
  protected readonly _log: MethodLoggers<TSelf>;
  protected readonly _jsonFileService: JsonService<TStore>;
  protected _cachePath: string;
  protected _filename: string = "cache.json";
  protected _cache: TStore | null = null;

  /**
   * @constructor
   * @description The constructor. Accepts parameters of type
   * {@link winston.Logger}, {@link JsonService}, and {@link string}.
   * @param logger - An instance of {@link winston.Logger}. Used for logging.
   * @param jsonFileService - An instance of the {@link JsonService} class.
   * A core component for the default CRUD operations of the cache service.
   * @param cachePath - The path to the cache folder.
   */
  public constructor(
    logger: winston.Logger,
    jsonFileService: JsonService<TStore>,
    cachePath: string
  ) {
    this._logger = logger;
    this._log = getMethodLoggers<TSelf>(logger);
    this._jsonFileService = jsonFileService;
    this._cachePath = cachePath;
  }

  public get cache(): TStore {
    this.assertCacheNotNull(this._cache); //  ! throws JsonError
    return this._cache;
  }

  public get lastAccessed(): Date {
    this.assertCacheNotNull(this._cache); //  ! throws JsonError
    return this._cache.lastAccessed;
  }

  //  todo: finish this
  public set cachePath(newCachePath: string) {}

  public setCachePath(newCachePath: string): string {
    this._log.debug("setCachePath", `Setting cache path to: ${newCachePath}`);
    this._cachePath = newCachePath;
    return this._cachePath;
  }

  public setFilename(newFilename: string): string {
    this._log.debug("setFilename", `Setting filename to: ${newFilename}`);
    this._filename = newFilename;
    return this._filename;
  }

  /**
   * @description Asynchronously loads the cache into memory. The successfully
   * loaded cache is validated then stored interally in {@link _cache}.
   * @returns A `Promise` that resolves to the loaded cache.
   * @throws {CacheError} `CACHE_PARSE_ERROR` | `INVALID_CACHE_ERROR`
   */
  public async loadCache(): Promise<TStore> {
    this._log.info("loadCache", "Loading cache into memory...");

    //  !Throws CacheError: CACHE_PARSE_ERROR on parse operation fail.
    const cache: TStore = await this.tryParseCache();

    if (!this.isCacheValid(cache)) {
      this._log.info("loadCache", "Failed loading cache into memory.");
      throw new CacheIO.ErrorClass({
        name: "CACHE_IO_INVALID_CACHE_ERROR",
        message: "Invalid cache object.",
      });
    }

    this._log.info("loadCache", "Success loading cache into memory.");
    this._cache = cache;
    return cache;
  }
  /**
   * @description Attempts to store data into the cache, validating it with
   * {@link isCacheValid} first, then writing it into the cache.
   *
   * @param data The data to be stored into cache.
   * @returns A `Promise` that resolves to the newly created {@link StoreBase}
   * object.
   * @throws {CacheError} `INVALID_CACHE_ERROR` | `CACHE_PERSIST_ERROR`
   */
  public async persistCache(data: TStore): Promise<TStore> {
    const { _cachePath, _filename, _log } = this;
    const fullPath = _cachePath + _filename;

    _log.info(
      "persistCache",
      `Attempting to store data into cache at ${fullPath}...`
    );

    try {
      if (!this.isCacheValid(data))
        throw new CacheIO.ErrorClass({
          name: "CACHE_IO_INVALID_CACHE_ERROR",
          message: "Invalid cache",
        });

      const storedCache = await this._jsonFileService.writeToJsonFile(
        _cachePath,
        _filename,
        data
      );

      _log.info("persistCache", "Success storing data into cache.");

      return storedCache;
    } catch (err) {
      _log.error("persistCache", "Failed storing data into cache.", err);

      if (err instanceof CacheIO.ErrorClass) throw err;
      throw new CacheIO.ErrorClass({
        name: "CACHE_IO_PERSIST_ERROR",
        message: "Failed storing data into cache.",
        cause: err,
      });
    }
  }

  /**
   * @description Wrapper method for {@link JsonService}'s
   * `generateFilename` method.
   * @param nameElements
   * @returns
   */
  public generateCacheFilename(...nameElements: string[]) {
    const { JSON: jsonExt } = CACHE.EXTENSION;
    return this._jsonFileService.generateFileName(jsonExt, ...nameElements);
  }

  /**
   * @description Wrapper method for {@link JsonService} `asssertDataNotNull`
   * method.
   * @param cache The cache to check.
   * @throws {JsonError} Thrown with `name: "NULL_DATA_ERROR"`.
   */
  public assertCacheNotNull(cache: TStore | null): asserts cache is TStore {
    this._jsonFileService.assertDataNotNull(cache);
  }

  /**
   * @description
   * Attempts to parse the cache file using the configured `reviver`.
   * @returns A `Promise` that resolves to the parsed `cache` object.
   * @throws {CacheError} `CACHE_PARSE_ERROR`
   * @remarks
   * Override {@link reviver} in subclasses if custom deserialization
   * is needed.
   */
  protected async tryParseCache(): Promise<TStore> {
    const { _cachePath, _filename, _log } = this;
    const fullPath = _cachePath + _filename;
    const logInfo = (message: string) => _log.info("tryParseCache", message);

    logInfo(`Attempting to parse cache at ${fullPath}...`);
    try {
      const parsedCache = await this._jsonFileService.parseJsonFile(
        _cachePath,
        _filename,
        this.reviver
      );

      logInfo(`Attempting to parse cache at ${fullPath}...`);
      return parsedCache;
    } catch (err) {
      const error = new CacheIO.ErrorClass({
        name: "CACHE_IO_PARSE_ERROR",
        message: "Failed parsing cache.",
        cause: err,
      });
      _log.error("tryParseCache", "Failed parsing cache.", error);
      throw error;
    }
  }

  /**
   * @description Revives stringified dates in cache files.
   * Override if the cache shape requires custom reviving logic
   */
  protected reviver(key: string, value: any) {
    const isDateKey = key === "createdOn" || key === "lastAccessed";
    if (isDateKey && typeof value === "string") return new Date(value);
    return value;
  }

  /**
   * @description Checks if the {@link StoreBase} object is valid.
   * @remarks
   * Override in child classes if custom validation is required.
   */
  protected isCacheValid(cache: TStore | null): boolean {
    return !!cache;
  }
}
