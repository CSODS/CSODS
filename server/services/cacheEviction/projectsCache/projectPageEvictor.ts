import { IProjectCachePage } from "../../../viewmodels/cache/cacheInterfaces.js";
import { createJsonFileHandler, JsonFileHandler } from "../../../utils/file/fileHandler.js";
import { BaseCacheEvictor, IEvictionOptions } from "../baseCacheEvictor.js";

export function createProjectPageEvictor (evictionOptions: IEvictionOptions): ProjectPageEvictor {
    const jsonFileHandler = createJsonFileHandler<IProjectCachePage>('IProjectCachePage');
    const evictor = new ProjectPageEvictor(jsonFileHandler, evictionOptions);
    return evictor;
}

export class ProjectPageEvictor extends BaseCacheEvictor<IProjectCachePage> {
    public constructor(
        jsonFileHandler: JsonFileHandler<IProjectCachePage>,
        evictionOptions: IEvictionOptions
    )
    {
        super(jsonFileHandler, evictionOptions);
    }

    
}