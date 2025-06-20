import { IProjectCachePage } from "../../../viewmodels/cache/cacheInterfaces";
import { JsonFileHandler } from "../../file/fileHandler";
import { BaseCacheEvictor, IEvictionOptions } from "../baseCacheEvictor";


export class ProjectPageEvictor extends BaseCacheEvictor<IProjectCachePage> {
    public constructor(
        jsonFileHandler: JsonFileHandler<IProjectCachePage>,
        evictionOptions: IEvictionOptions
    )
    {
        super(jsonFileHandler, evictionOptions);
    }

    
}