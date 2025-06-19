import { existsSync, promises as fs} from 'fs';
import * as lockfile from 'proper-lockfile';
import path from 'path';
import { OperationOptions } from 'retry';
import { boolean } from 'drizzle-orm/gel-core';

export function createJsonFileHandler<TModel>(modelName: string) {
    return new JsonFileHandler<TModel>(modelName);
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
export class JsonFileHandler<TModel> {
    private readonly _modelName: string;
    private readonly _retryOptions:  OperationOptions = {
        retries: 10,
        factor: 1.5,
        minTimeout: 1 * 1000,
        maxTimeout: 60 * 1000
    };
    /**
     * Constructs a new instance of `JsonFileHandler`.
     * 
     * @param {string} modelName A string identifier representing the name of the model, used in logging and error messages.
     */
    public constructor (modelName: string) {
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
    public async parseJsonFile(
        filePath: string, 
        fileName: string,
        reviver: Parameters<typeof JSON.parse>[1] | null = null
    ): Promise<TModel | null> 
    {
        const fullPath = path.join(filePath, fileName);
        console.log(`Attempting to access .json file from ${fullPath}...`);
        
        //  Return null if the file does not exist.
        if (!existsSync(fullPath)) {
            console.log(`${fullPath} does not exist. Returning null...`);
            return null;
        }

        let release: (() => Promise<void>) | null = null;

        //  Read from json file
        try {
            //  Attempt to read file.
            console.log(`.json file found. Attempting to parse...`);
            
            //  Lock file.
            release = await lockfile.lock(fullPath, {retries: this._retryOptions});
            console.log('File lock acquired');

            //  Parse Json as a TModel object and return.
            //  Additionally apply a reviver function if provided.
            const jsonString = await fs.readFile(fullPath, 'utf-8');
            const data: TModel = (
                reviver
                    ? JSON.parse(jsonString, reviver)
                    : JSON.parse(jsonString)
            );
            
            this.assertDataNotNull(data);
            console.log('.json file has been parsed successfully.');
            return data;
        } catch (err) {
            //  log error and return null.
            console.error('Error parsing cache: ', err);
            return null;
        } finally {
            if (release) {
                //  release lock.
                await release();
                console.log('File lock released');
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
    public async writeToJsonFile(filePath: string, fileName: string, data: TModel | null): Promise<TModel> {
        let release: (() => Promise<void>) | null = null;
        
        try {
            //  throw exception if data is null.
            this.assertDataNotNull(data);

            //  Attempt to write to json file.
            const dataJson = JSON.stringify(data, null, 2);
            //  Ensure the directory exists. Create it recursively if it doesn't.
            console.log(`Ensuring directory exists: ${filePath}`);
            await fs.mkdir(filePath, { recursive: true });
            console.log('Directory ensured.');
            
            const fullPath = path.join(filePath, fileName);

            if (existsSync(fullPath)) {
                release = await lockfile.lock(fullPath, {retries: this._retryOptions});
                console.log('Lock acqquired.');                
            }


            //  attempt to write to file.
            console.log('Attempting to write json file...');
            await fs.writeFile(fullPath, dataJson);
            console.log('Json file written.');
            
            return data!;
        } catch (err) {
            console.error('Error writing cache: ', err);
            throw err;
        } finally {
            if (release) {
                await release();
                console.log('File lock released.');
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
    public async deleteJsonFile(filePath: string, fileName: string): Promise<boolean> {
        let release: (() => Promise<void>) | null = null;
        const fullPath = path.join(filePath, fileName);
        
        try {            
            if (existsSync(fullPath)) {
                release = await lockfile.lock(fullPath, {retries: this._retryOptions});
                console.log('Lock acqquired.');                
            }

            //  attempt to write to file.
            console.log('Attempting to delete json file...');
            await fs.unlink(fullPath);
            console.log('Json file deleted.');
            return true;
        } catch (err) {
            console.log('Json file failed deleting: ', err);
            return false;
        } finally {
            if (release) {
                await release();
                console.log('File lock released.');
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
        if (data == null )
            throw new TypeError(`Expected type ${this._modelName}, but received null.`);
        
    }

    /**
     * Generates a file name using a given file extension and an arbitrary number of name elements.
     * The name elements will be joined by hyphens.
     *
     * @param fileExtension The extension of the file.
     * @param nameElements An arbitrary number of string elements that will form the base name of the file.
     * @returns A string representing the complete file name.
     */
    public generateFileName(fileExtension: string, ...nameElements: string[]): string {
        //  Removes falsy values including '', null, and undefined.
        nameElements = nameElements.filter(Boolean);
        const fileName: string = nameElements.join('-');
        return `${fileName}.${fileExtension}`;
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
    Filepath: string,
    /**
     * The file name including it's extension (e.g. .json, .txt)
     */
    Filename: string
}