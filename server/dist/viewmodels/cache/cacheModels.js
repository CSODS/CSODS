export class ProjectCache {
    constructor() {
        this.TotalPages = 0;
        this.LoadTime = new Date();
        this.CachePages = {};
    }
    withTotalPages(totalPages) {
        this.TotalPages = totalPages;
        return this;
    }
    withLoadTime(loadTime) {
        this.LoadTime = loadTime;
        return this;
    }
    withCachePages(cachePages) {
        this.CachePages = cachePages;
        return this;
    }
}
