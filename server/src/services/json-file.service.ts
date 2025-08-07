import { existsSync, promises as fs } from "fs";
import * as lockfile from "proper-lockfile";
import path from "path";
import { OperationOptions } from "retry";
import { FileLogger } from "@utils";

export function createJsonFileService<TModel>(modelName: string) {
  return new JsonFileService<TModel>(modelName);
}

/**
 * A generic JSON file handler for reading and writing model data to disk in JSON format.
 *
 * This class provides utility methods for safely parsing and serializing objects of type `TModel`.
 * It includes built-in checks for file existence and null values, as well as optional support
 * for a custom JSON reviver function during parsing.
 *
 * @template TModel The type of the model object to be serialized/deserialized.
 */
export class JsonFileService<TModel> {
  private readonly _modelName: string;
  private readonly _retryOptions: OperationOptions = {
    retries: 10,
    factor: 1.5,
    minTimeout: 1 * 1000,
    maxTimeout: 60 * 1000,
  };
  /**
   * Constructs a new instance of `JsonFileHandler`.
   *
   * @param {string} modelName A string identifier representing the name of the model, used in logging and error messages.
   */
  public constructor(modelName: string) {
    this._modelName = modelName;
  }
  //#region .json CRUD

  /**
   * @public
   * @async
   * @function getDirectoryFilenames
   * @description
   * Retrieves a list of filenames from the specified directory. Optionally filters the filenames using a custom predicate function.
   *
   * If the directory does not exist, an empty array is returned. If a filter condition is provided, only filenames for which
   * the condition returns a truthy value will be included in the result.
   *
   * @param {string} directory - The absolute or relative path to the directory whose filenames should be retrieved.
   * @param {(filename: string, index: number, array: string[]) => boolean} [filterCondition] -
   * An optional predicate function used to filter the filenames. Receives each filename, its index, and the full list of filenames.
   *
   * @returns {Promise<string[]>} A promise that resolves to an array of filenames (optionally filtered).
   *
   * @example
   * // Get all filenames
   * const allFiles = await getDirectoryFilenames('./my-folder');
   *
   * // Get only .json files
   * const jsonFiles = await getDirectoryFilenames('./my-folder', (name) => name.endsWith('.json'));
   */
  public async getDirectoryFilenames(
    directory: string,
    filterCondition?: (
      filename: string,
      index: number,
      array: string[]
    ) => boolean
  ): Promise<string[]> {
    FileLogger.info(
      `[getDirectoryFilenames] Retrieving filenames in directory ${directory}...`
    );
    if (!existsSync(directory)) {
      FileLogger.warn(
        "[getDirectoryFilenames] Directory does not exist. Filename list is empty."
      );
      return [] as string[];
    }

    try {
      let filenames = await fs.readdir(directory);

      if (filterCondition) {
        filenames = (filenames ?? []).filter(filterCondition);
      }
      FileLogger.info(
        `[getDirectoryFilenames] Retrieved ${filenames.length} from ${directory}`
      );
      FileLogger.debug(
        `[getDirectoryFilenames] Filenames: ${filenames.join(", ")}`
      );
      return filenames;
    } catch (err) {
      FileLogger.error(
        "[getDirectoryFilenames] Error retrieving filenames.",
        err
      );
      return [] as string[];
    }
  }

  /**
   * Reads and parses a JSON file from the specified path into an object of type `TModel`.
   *
   * If the file does not exist or cannot be parsed due to an error, the method returns `null`.
   * An optional reviver function can be passed to customize the JSON parsing behavior.
   *
   * @param {string} filePath - The directory path containing the JSON file.
   * @param {string} fileName - The name of the JSON file to be read.
   * @param {Function|null} [reviver] - An optional reviver function for custom JSON parsing.
   * @returns {Promise<TModel>} A promise that resolves to the parsed object or `null` if reading or parsing fails.
   */
  public async parseJsonFile(
    filePath: string,
    fileName: string,
    reviver: Parameters<typeof JSON.parse>[1] | null = null
  ): Promise<TModel> {
    const fullPath = path.join(filePath, fileName);
    FileLogger.info(
      `[parseJsonFile] Attempting to parse json file ${fullPath}...`
    );

    //  Throw err if the file does not exist.
    if (!existsSync(fullPath))
      throw new Error("File doesn't exist. Unable to parse.");

    let release: (() => Promise<void>) | null = null;

    //  Read from json file
    try {
      //  Attempt to read file.

      //  Lock file.
      FileLogger.info("[parseJsonFile] Locking file...");
      release = await lockfile.lock(fullPath, { retries: this._retryOptions });

      //  Parse Json as a TModel object and return.
      //  Additionally apply a reviver function if provided.
      const jsonString = await fs.readFile(fullPath, "utf-8");
      const data: TModel = reviver
        ? JSON.parse(jsonString, reviver)
        : JSON.parse(jsonString);

      this.assertDataNotNull(data);
      FileLogger.info("[parseJsonFile] Success parsing file.");

      return data;
    } catch (err) {
      //  log error and return null.
      FileLogger.error(`[parseJsonFile] Error parsing file.`, err);
      throw err;
    } finally {
      if (release) {
        //  release lock.
        await release();
        FileLogger.info("[parseJsonFile] Lock released.");
      }
    }
  }
  /**
   * Serializes the provided data object and writes it to a JSON file at the specified path.
   *
   * If the target directory does not exist, it will be created. Throws if the data is `null`.
   *
   * @param {string} filePath - The directory path where the JSON file should be written.
   * @param {string} fileName - The name of the JSON file to write.
   * @param {TModel|null} data - The object to serialize and write. Must not be `null`.
   * @returns {Promise<TModel>} A promise that resolves to the written data on success.
   * @throws {Error} If the data is `null` or the write operation fails.
   */
  public async writeToJsonFile(
    filePath: string,
    fileName: string,
    data: TModel | null
  ): Promise<TModel> {
    let release: (() => Promise<void>) | null = null;

    try {
      FileLogger.info(
        `[writeToJsonFile] Attempting to write into ${fileName} located in ${filePath}...`
      );
      //  throw exception if data is null.
      this.assertDataNotNull(data);

      //  Attempt to write to json file.
      const dataJson = JSON.stringify(data, null, 2);
      //  Ensure the directory exists. Create it recursively if it doesn't.
      await fs.mkdir(filePath, { recursive: true });

      const fullPath = path.join(filePath, fileName);

      if (existsSync(fullPath)) {
        FileLogger.info("[writeToJsonFile] Locking file...");
        release = await lockfile.lock(fullPath, {
          retries: this._retryOptions,
        });
      }

      //  attempt to write to file.
      await fs.writeFile(fullPath, dataJson);
      FileLogger.info("[writeToJsonFile] Write complete.");

      return data!;
    } catch (err) {
      FileLogger.error(`[writeToJsonFile] Error writing file.`, err);
      throw err;
    } finally {
      if (release) {
        await release();
        FileLogger.info("[writeToJsonFile] Lock released.");
      }
    }
  }
  /**
   * Deletes a JSON file.
   *
   * If the file exists, lock the file first.
   *
   * Returns true if the file is deleted and false otherwise.
   *
   * @param filePath - The directory path where the JSON file is stored.
   * @param fileName - THe name of the JSON file to delete.
   * @returns - True if the file is deleted, false otherwise.
   */
  public async deleteJsonFile(
    filePath: string,
    fileName: string
  ): Promise<boolean> {
    let release: (() => Promise<void>) | null = null;
    const fullPath = path.join(filePath, fileName);

    FileLogger.info(
      `[deleteJsonFile] Attempting to delete file at ${fullPath}...`
    );

    if (!existsSync(fullPath)) {
      FileLogger.warn(`[deleteJsonFile] File at ${fullPath} does not exist.`);
      return true;
    }

    try {
      FileLogger.info("[deleteJsonFile] Locking file...");
      release = await lockfile.lock(fullPath, { retries: this._retryOptions });

      //  attempt to write to file.
      await fs.unlink(fullPath);
      FileLogger.info("[deleteJsonFile] Delete success.");
      return true;
    } catch (err) {
      FileLogger.error("[deleteJsonFile] Error deleting file.", err);
      return false;
    } finally {
      if (release) {
        await release();
        FileLogger.info("[deleteJsonFile] Lock released.");
      }
    }
  }
  //#endregion

  //#region .json Utility Methods

  /**
   * Throws a `TypeError` if the given data is `null`.
   *
   * Used to enforce non-null guarantees before performing operations like serialization.
   *
   * @param {TModel|null} data - The data to check.
   * @throws {TypeError} If the provided data is `null`.
   */
  public assertDataNotNull(data: TModel | null): asserts data is TModel {
    if (data == null)
      throw new TypeError(
        `Expected type ${this._modelName}, but received null.`
      );
  }

  /**
   * Generates a file name using a given file extension and an arbitrary number of name elements.
   * The name elements will be joined by hyphens.
   *
   * @param fileExtension The extension of the file.
   * @param nameElements An arbitrary number of string elements that will form the base name of the file.
   * @returns A string representing the complete file name.
   */
  public generateFileName(
    fileExtension: string,
    ...nameElements: string[]
  ): string {
    //  Removes falsy values including '', null, and undefined.
    nameElements = nameElements.filter(Boolean);
    const fileName: string = nameElements.join("-");
    return `${fileName}.${fileExtension}`;
  }
  /**
   * @private
   *
   * @async
   * @function processFiles
   * @description
   * Retrieves a list of JSON files (or other files based on the optional filter) from the specified directory,
   * and applies a given asynchronous function to each file.
   *
   * Useful for batch-processing files such as cache entries, logs, or configuration files.
   *
   * @param {string} directory - The path to the directory containing the files to process.
   * @param {(file: IFile) => Promise<void>} callbackFn - An asynchronous function to apply to each file. Receives an object with `Filepath` and `Filename`.
   * @param {(filename: string, index: number, filenames: string[]) => boolean} [filenameFilter] -
   * An optional predicate function used to filter which filenames should be included for processing.
   *
   * @returns {Promise<void>} A promise that resolves once all applicable files have been processed.
   *
   * @example
   * await processFiles('./cache', async (file) => {
   *     const data = await readFile(join(file.Filepath, file.Filename), 'utf-8');
   *     console.log(JSON.parse(data));
   * }, (name) => name.endsWith('.json'));
   */
  public async processFiles(
    directory: string,
    callbackFn: (file: IFile) => Promise<void>,
    filenameFilter?: (
      filename: string,
      index: number,
      filenames: string[]
    ) => boolean
  ): Promise<void> {
    FileLogger.info(
      `[processFiles] Processing files from diretory ${directory}...`
    );
    const filenames = await this.getDirectoryFilenames(
      directory,
      filenameFilter
    );

    if (filenames.length === 0) {
      FileLogger.warn(
        "[processFiles] Filename list is empty. Ending process..."
      );
      return;
    }

    for (const filename of filenames) {
      const file: IFile = {
        Filepath: directory,
        Filename: filename,
      };
      await callbackFn(file);
    }

    FileLogger.info(
      `[processFiles] Finished processing ${filenames.length} files.`
    );
  }
  //#endregion
}

/**
 * Represents a file with its path and name.
 */
export interface IFile {
  /**
   * The file path leading to the file's directory.
   */
  Filepath: string;
  /**
   * The file name including it's extension (e.g. .json, .txt)
   */
  Filename: string;
}
