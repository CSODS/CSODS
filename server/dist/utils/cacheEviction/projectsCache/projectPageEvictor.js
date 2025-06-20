import { BaseCacheEvictor } from "../baseCacheEvictor";
export class ProjectPageEvictor extends BaseCacheEvictor {
    constructor(jsonFileHandler, evictionOptions) {
        super(jsonFileHandler, evictionOptions);
    }
}
