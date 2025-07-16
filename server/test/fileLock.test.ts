import mock from "mock-fs";
import { createJsonFileHandler, JsonFileHandler } from "../services/file/fileHandler";
import {describe, beforeEach, afterEach, it, expect} from "vitest";
import path from 'path';
import { IProjectCache } from "../viewmodels/cache/cacheInterfaces";
import { promises as fs } from "fs";

describe('fileHandler', async () => {
    const _jsonFileHandler = await createJsonFileHandler<IProjectCache>('IProjectCache');

    const _date = new Date();

    const _dataRead: IProjectCache = {
        TotalPages: 0,
        CreatedOn: _date,
        LastAccessed: _date,
        ViewCount: 0,
        IsBackup: true,
        CachePages: {}
    }

    const _dataWrite: IProjectCache = {
        TotalPages: 5,
        CreatedOn: _date,
        LastAccessed: _date,
        ViewCount: 0,
        IsBackup: true,
        CachePages: {}
    }

    const _mockData = (i: number): IProjectCache => ({
        TotalPages: i,
        CreatedOn: _date,
        LastAccessed: new Date(),
        ViewCount: 0,
        IsBackup: true,
        CachePages: {},
    });

    const reviver: Parameters<typeof JSON.parse>[1] = (key, value) => {
        if (key === 'LoadTime' && typeof value === 'string')
            return new Date(value);
        return value
    }

    beforeEach(() => {
        mock({
            'cache': {
                'fake.json': JSON.stringify(_dataRead)
            }
        });
    });

    afterEach(() => {
        mock.restore(); // Restores the real file system
    });

    it('reads JSON from file', async () => {
        const data = await _jsonFileHandler.parseJsonFile('cache/', 'fake.json', reviver);
        expect(data).toEqual(_dataRead);
    });

    it('writes JSON to file', async () => {
        await _jsonFileHandler.writeToJsonFile('cache/', 'fake.json', _dataWrite);

        const content = await _jsonFileHandler.parseJsonFile('cache/', 'fake.json', reviver);
        expect(content).toEqual(_dataWrite);
    });
});