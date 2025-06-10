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

export class ProjectCachePage implements IProjectCachePage {
    VisitCount: number = 0;
    ProjectList: Project[] = [];

    public withVisitCount(visitCount: number): this {
        this.VisitCount = visitCount;
        return this;
    }

    public withProjectList(projectList: Project[]): this {
        this.ProjectList = projectList;
        return this;
    }
}