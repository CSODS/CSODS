import { createJsonFileHandler } from "../../file/fileHandler.js";
import { BaseCacheEvictor } from "../baseCacheEvictor.js";
export function createProjectPageEvictor(evictionOptions) {
    const jsonFileHandler = createJsonFileHandler('IProjectCachePage');
    const evictor = new ProjectPageEvictor(jsonFileHandler, evictionOptions);
    return evictor;
}
export class ProjectPageEvictor extends BaseCacheEvictor {
    constructor(jsonFileHandler, evictionOptions) {
        super(jsonFileHandler, evictionOptions);
    }
}
