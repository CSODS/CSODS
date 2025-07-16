import { createJsonFileHandler, JsonFileHandler } from "@services";
import { IProjectCachePage } from "@viewmodels";
import { IEvictionOptions, BaseCacheEvictor } from "../baseCacheEvictor";

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