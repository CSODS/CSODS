import { InferSelectModel } from 'drizzle-orm';
import { Projects, Users } from '../../db/schema.js';

type Project = InferSelectModel<typeof Projects>;
type User = InferSelectModel<typeof Users>;

/**
 * A View Model for the Project Cache.
 *
 * This interface represents the structure used to cache paginated project data,
 * enabling efficient retrieval and display in a paginated view.
 *
 * @property {number} TotalPages - The total number of available pages of projects.
 * @property {Date} LoadTime - The timestamp when this cache was last loaded or refreshed.
 * @property {Record<number, CachePage>} CachePages - A mapping of page numbers to CachePage objects.
 * Each key is a page number, and the corresponding value is a CachePage instance representing cached data for that page.
 */
export interface IProjectCache {
    TotalPages: number;
    LoadTime: Date;
    CachePages: Record<number, IProjectCachePage>;
}

/**
 * Represents a cached page of projects within the ProjectCache.
 *
 * @property {number} VisitCount - The number of times that the page has been visited.
 * @property {Project[]} ProjectList - The project list associated with this page.
 */
export interface IProjectCachePage {
    VisitCount: number;
    ProjectList: Project[];
}

/**
 * A View Model for the User Cache.
 *
 * This interface represents the structure used to cache data
 * 
 * @property {Record<string, User>} Users - A mapping of usernames to users.
 * Each key is a username, and the corresponding value is the user object.
 */
export interface IUserCache {
    Users: Record<string, User>
}

export type ProjectCachePages = Record<number, IProjectCachePage>;

