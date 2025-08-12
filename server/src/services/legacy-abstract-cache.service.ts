import winston from "winston";
import { StoreBase } from "@viewmodels";
import { JsonFileService } from "./json-file-service";

/**
 * @deprecated Please use new AbstractCacheService. Will be removed before the pr.
 * @abstract
 * @class
 * @description An abstract class to be used for caching services.
 * Provides CRUD methods for with default behaviors for `json` cache handling and a method signature for a
 * {@link constructCache} method that **must** be implemented for default cache creation logic.
 * Contains the following fields:
 * - {@link _logger} - An instance of {@link winston.Logger}. Used for logging.
 * - {@link _jsonFileHandler} - An instance of the {@link JsonFileService} class. A core component for the default
 * CRUD operations of the cache service.
 * - {@link _cachePath} - The path to the cache folder.
 * - {@link _filename} - The filename of the cache. `cache.json` by default.
 * - {@link _cache} - The in-memory reference of the {@link StoreBase} object loaded from the cache. `null` by
 * default.
 */
export abstract class LegacyAbstractCacheService<TCache extends StoreBase> {
  protected readonly _logger: winston.Logger;
  protected readonly _jsonFileHandler: JsonFileService<TCache>;
  protected readonly _cachePath: string;
  protected _filename: string = "cache.json";
  protected _cache: TCache | null = null;
  /**
   * @public
   * @constructor
   * @description The constructor. Accepts parameters of type {@link JsonFileService} and {@link string}.
   * @param logger - An instance of {@link winston.Logger}. Used for logging.
   * @param jsonFileHandler - An instance of the {@link JsonFileService} class. A core component for the default
   * CRUD operations of the cache service.
   * @param cachePath - The path to the cache folder.
   */
  public constructor(
    logger: winston.Logger,
    jsonFileHandler: JsonFileService<TCache>,
    cachePath: string
  ) {
    this._logger = logger;
    this._jsonFileHandler = jsonFileHandler;
    this._cachePath = cachePath;
  }
  /**
   * @public
   * @method getCache
   * @description Accessor for the {@link _cache} field.
   * @returns The value of the {@link _cache} field.
   */
  public getCache(): TCache | null {
    return this._cache;
  }
  /**
   * @public
   * @method getLastAccessed
   * @description Accessor for the {@link StoreBase.lastAccessed} field of {@link _cache}.
   * @returns The value of the {@link StoreBase.lastAccessed} field. `null` if {@link _cache} is `null`.
   */
  public getLastAccessed(): Date | null {
    return this._cache?.lastAccessed ?? null;
  }

  /**
   * @virtual
   * @method setCache
   * @description Loads the cache into memory.
   *
   * Attempts to load the cache or create it from a JSON file whose name is derived by the
   * {@link getFilename} method.
   *
   * The sucessfully loaded cache is stored interally in {@link _cache} and returned.
   *
   * @returns A promise that resolves to the loaded cache, or `null` if no
   * results were found or all loading attempts failed.
   *
   * @remarks
   * {@link getFilename} may be optionally overriden for custom filename generation.
   *
   * Subclasses may override this to implement custom cache setting or fallback logic.
   * If overridden, these methods must always be called in order to ensure cache consistency:
   * - the method {@link getFilename} **must** always be called during preparatory logic.
   * - the method {@link tryParseOrCreateCache} **must** always be called after any preparatory logic
   * and before any fallback logic.
   *
   */
  public async setCache(): Promise<TCache | null> {
    //  Preparatory logic
    this._filename = this.getFilename();
    //  Preparatory logic

    //  Primary cache parsing/creation.
    let cache: TCache | null = await this.tryParseOrCreateCache();

    if (!this.isCacheValid(cache)) {
      //  Fallback logic.
    }
    if (!this.isCacheValid(cache)) {
      this._logger.warn(
        "All cache retrieval fallback routines failed. Returning null..."
      );
      return null;
    }

    this._cache = cache;
    return cache;
  }

  /**
   * @protected
   * @method tryParseOrCreateCache
   * @description Tries to read the cache from a file. If that fails, attempts to create a new one.
   * Retries creation up to three times if needed.
   *
   * @returns A promise that resolves to the parsed or newly created cache,
   * or `null` on failure.
   */
  protected async tryParseOrCreateCache(): Promise<TCache | null> {
    let cache: TCache | null = await this.parseCache();

    if (this.isCacheValid(cache)) {
      this._logger.info("Success parsing cache.");
      return cache;
    } else {
      this._logger.warn("Failed parsing cache.");

      for (let i = 0; i < 3; i++) {
        const newCache = await this.tryCreateCache();

        if (this.isCacheValid(newCache)) {
          return newCache;
        }
      }
    }

    this._logger.warn("Fail parsing existing cache and creating new cache.");
    return null;
  }
  /**
   * @protected
   * @method parseCache
   * @description Asynchronously parses a JSON cache file. Utilizes a helper function `reviver` for
   * reviving `Date` type fields.
   *
   * @param filePath - An optional parameter that overrides the default cache path provided on class
   * instantiation.
   * @returns A Promise that resolves to the parsed `cache` object, or `null` if the parsing fails or the
   * file is not found.
   *
   * @remarks
   * If the shape of the `cache` object has fields in need of a reviver other than the default provided fields
   * in {@link LegacyAbstractCacheService.reviver}, reviver must be overriden.
   */
  protected async parseCache(filePath?: string): Promise<TCache | null> {
    const cachePath = filePath ?? this._cachePath;
    const filename = this._filename;
    const reviver = this.reviver;

    this._logger.info(`Parsing cache at ${cachePath}${this._filename}...`);

    const cache = await this._jsonFileHandler.parseJsonFile(
      cachePath,
      filename,
      reviver
    );
    return cache;
  }
  /**
   * @protected
   * @method reviver
   * @description A helper function to be used in {@link parseCache} as a parameter for calling
   * {@link JsonFileService.parseJsonFile}.
   *
   * Revives certain fields.
   *
   * By default, converts fields {@link StoreBase.createdOn}, and {@link StoreBase.lastAccessed} fields back
   * into `Date` type.
   *
   * @param key - The property name.
   * @param value - The property value.
   * @returns - The transformed value.
   *
   * @remarks
   * If the shape of the `cache` object has fields in need of a reviver other than the default provided fields,
   * the method must be overriden.
   */
  protected reviver(key: string, value: any) {
    const isDateKey = key === "CreatedOn" || key === "LastAccessed";
    if (isDateKey && typeof value === "string") {
      return new Date(value);
    }
    return value;
  }
  /**
   * @protected
   * @method tryCreateCache
   * @description Attempts to create a new cache by generating a new cache object with the {@link constructCache}
   * method, validating it with {@link isCacheValid}, and writing it into a file.
   * If the constructed cache is not valid, an `Error` is thrown, and `null` is returned.
   *
   * @param filePath An optional parameter that overrides the default {@link _cachePath} when specified.
   * @returns A promise that rsolvse to the newly created {@link StoreBase} object, or `null` if the cache construction
   * or the write operation fails.
   *
   * @remarks
   * Requires defining an implementation of the {@link constructCache} method.
   */
  protected async tryCreateCache(filePath?: string): Promise<TCache | null> {
    const cachePath = filePath ?? this._cachePath;
    const filename = this._filename;

    try {
      this._logger.info("Attempting to write cache...");

      const newCache = await this.constructCache();

      if (!this.isCacheValid(newCache)) {
        throw new Error("Invalid cache.");
      }

      const savedCache = await this._jsonFileHandler.writeToJsonFile(
        cachePath,
        filename,
        newCache
      );

      this._logger.info("Success creating cache.");

      return savedCache;
    } catch (err) {
      this._logger.error("Failed writing cache.", err);
      return null;
    }
  }

  /**
   * @protected
   * @method getFilename
   * @description Generates a JSON cache filename. Returns the default {@link _filename} value
   * `cache.json`.
   *
   * @returns The constructed filename for the cache file (`cache.json` by default).
   *
   * @remarks
   * Subclasses may override this method to implement custom name generation logic.
   */
  protected getFilename(): string {
    return this._filename;
  }
  /**
   * @protected
   * @method isCacheValid
   * @description Checks if the {@link StoreBase} object is valid.
   *
   * @param cache - The {@link StoreBase} object to be validated.
   * @returns `true` if the cache is valid, `false` otherwise.
   *
   * @remarks
   * Subclasses may override this method if additional validation logic is needed.
   */
  protected isCacheValid(cache: TCache | null) {
    return cache ? true : false;
  }

  /**
   * @abstract
   * @method constructCache
   * @description An abstract method that on definition will generate the {@link StoreBase} object to be used
   * when writing to a `json` file with {@link tryCreateCache}.
   *
   * @returns The generated {@link StoreBase} object.
   */
  protected abstract constructCache(): Promise<TCache>;
}
