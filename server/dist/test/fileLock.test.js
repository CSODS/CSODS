var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mock from "mock-fs";
import { createJsonFileHandler } from "../utils/file/fileHandler";
import { describe, beforeEach, afterEach, it, expect } from "vitest";
describe('fileHandler', () => __awaiter(void 0, void 0, void 0, function* () {
    const _jsonFileHandler = yield createJsonFileHandler('IProjectCache');
    const _date = new Date();
    const _dataRead = {
        TotalPages: 0,
        CreatedOn: _date,
        LastAccessed: _date,
        IsBackup: true,
        CachePages: {}
    };
    const _dataWrite = {
        TotalPages: 5,
        LastAccessed: _date,
        CreatedOn: _date,
        IsBackup: true,
        CachePages: {}
    };
    const _mockData = (i) => ({
        LastAccessed: new Date(),
        CreatedOn: _date,
        TotalPages: i,
        IsBackup: true,
        CachePages: {},
    });
    const reviver = (key, value) => {
        if (key === 'LoadTime' && typeof value === 'string')
            return new Date(value);
        return value;
    };
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
    it('reads JSON from file', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield _jsonFileHandler.parseJsonFile('cache/', 'fake.json', reviver);
        expect(data).toEqual(_dataRead);
    }));
    it('writes JSON to file', () => __awaiter(void 0, void 0, void 0, function* () {
        yield _jsonFileHandler.writeToJsonFile('cache/', 'fake.json', _dataWrite);
        const content = yield _jsonFileHandler.parseJsonFile('cache/', 'fake.json', reviver);
        expect(content).toEqual(_dataWrite);
    }));
}));
