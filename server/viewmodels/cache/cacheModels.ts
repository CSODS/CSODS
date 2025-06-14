import { IProjectCache, IProjectCachePage } from "./cacheInterfaces";
import { Project } from "../dbModels";

export class ProjectCache implements IProjectCache {
    TotalPages: number = 0;
    LoadTime: Date = new Date();
    CachePages: Record<number, IProjectCachePage> = {}

    public withTotalPages(totalPages: number): this {
        this.TotalPages = totalPages;
        return this;
    }

    public withLoadTime(loadTime: Date): this {
        this.LoadTime = loadTime;
        return this;
    }

    public withCachePages(cachePages: Record<number, IProjectCachePage>) {
        this.CachePages = cachePages;
        return this;
    }
}