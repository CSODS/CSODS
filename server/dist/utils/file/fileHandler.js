var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { existsSync, promises as fs } from 'fs';
import * as lockfile from 'proper-lockfile';
import path from 'path';
export function createJsonFileHandler(modelName) {
    return new JsonFileHandler(modelName);
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
export class JsonFileHandler {
    /**
     * Constructs a new instance of `JsonFileHandler`.
     *
     * @param {string} modelName A string identifier representing the name of the model, used in logging and error messages.
     */
    constructor(modelName) {
        this._retryOptions = {
            retries: 3,
            factor: 1.5,
            minTimeout: 1 * 1000,
            maxTimeout: 60 * 1000
        };
        this._modelName = modelName;
    }
    //#region .json CRUD
    /**
     * Reads and parses a JSON file from the specified path into an object of type `TModel`.
     *
     * If the file does not exist or cannot be parsed due to an error, the method returns `null`.
     * An optional reviver function can be passed to customize the JSON parsing behavior.
     *
     * @param {string} filePath - The directory path containing the JSON file.
     * @param {string} fileName - The name of the JSON file to be read.
     * @param {Function|null} [reviver] - An optional reviver function for custom JSON parsing.
     * @returns {Promise<TModel|null>} A promise that resolves to the parsed object or `null` if reading or parsing fails.
     */
    parseJsonFile(filePath_1, fileName_1) {
        return __awaiter(this, arguments, void 0, function* (filePath, fileName, reviver = null) {
            const fullPath = path.join(filePath, fileName);
            console.log(`Attempting to access .json file from ${fullPath}...`);
            //  Return null if the file does not exist.
            if (!existsSync(fullPath)) {
                console.log(`${fullPath} does not exist. Returning null...`);
                return null;
            }
            let release = null;
            //  Read from json file
            try {
                //  Attempt to read file.
                console.log(`.json file found. Attempting to parse...`);
                //  Lock file.
                release = yield lockfile.lock(fullPath, { retries: this._retryOptions });
                console.log('File lock acquired');
                //  Parse Json as a TModel object and return.
                //  Additionally apply a reviver function if provided.
                const jsonString = yield fs.readFile(fullPath, 'utf-8');
                const data = (reviver
                    ? JSON.parse(jsonString, reviver)
                    : JSON.parse(jsonString));
                this.assertDataNotNull(data);
                console.log('.json file has been parsed successfully.');
                return data;
            }
            catch (err) {
                //  log error and return null.
                console.error('Error parsing cache: ', err);
                return null;
            }
            finally {
                if (release) {
                    //  release lock.
                    yield release();
                    console.log('File lock released');
                }
            }
        });
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
    writeToJsonFile(filePath, fileName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let release = null;
            try {
                //  throw exception if data is null.
                this.assertDataNotNull(data);
                //  Attempt to write to json file.
                const dataJson = JSON.stringify(data, null, 2);
                //  Ensure the directory exists. Create it recursively if it doesn't.
                console.log(`Ensuring directory exists: ${filePath}`);
                yield fs.mkdir(filePath, { recursive: true });
                console.log('Directory ensured.');
                const fullPath = path.join(filePath, fileName);
                release = yield lockfile.lock(fullPath, { retries: this._retryOptions });
                console.log('Lock acqquired.');
                //  attempt to write to file.
                console.log('Attempting to write json file...');
                yield fs.writeFile(fullPath, dataJson);
                console.log('Json file written.');
                return data;
            }
            catch (err) {
                console.error('Error writing cache: ', err);
                throw err;
            }
            finally {
                if (release) {
                    yield release();
                    console.log('File lock released.');
                }
            }
        });
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
    assertDataNotNull(data) {
        if (data == null)
            throw new TypeError(`Expected type ${this._modelName}, but received null.`);
    }
}
