import { IProjectCache, IProjectCachePage } from "./cacheInterfaces";

// export class ProjectCache implements IProjectCache {
//     TotalPages: number = 0;
//     AccessTimestamp: Date = new Date();
//     CachePages: Record<number, IProjectCachePage> = {}

//     public withTotalPages(totalPages: number): this {
//         this.TotalPages = totalPages;
//         return this;
//     }

//     public withLoadTime(loadTime: Date): this {
//         this.AccessTimestamp = loadTime;
//         return this;
//     }

//     public withCachePages(cachePages: Record<number, IProjectCachePage>) {
//         this.CachePages = cachePages;
//         return this;
//     }
// }