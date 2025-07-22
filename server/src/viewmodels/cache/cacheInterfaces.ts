import * as tableTypes from "../dbModels.js";

//#region ProjectsCache

/**
 * A View Model for the Project Cache.
 *
 * This interface represents the structure used to cache paginated project data,
 * enabling efficient retrieval and display in a paginated view.
 */
export interface IProjectCache extends ICache {
    /**
     * The total number of available pages of projects.
     */
    TotalPages: number;
    /**
     * Flags if the cache is a backup cache.
     */
    IsBackup: boolean,
    /**
     * A mapping of page numbers to CachePage objects.
     * Each key is a page number, and the corresponding value is a CachePage instance 
     * representing cached data for that page.
     */
    CachePages: CachePageRecord;
}

export type CachePageRecord = Record<number, IProjectCachePage>;

/**
 * Represents a cached page of projects within the ProjectCache.
 */
export interface IProjectCachePage extends ICache{
    /**
     * The total number of available pages of projects.
     */
    TotalPages: number;
    /**
     * The project list associated with this page.
     */
    Projects: IProjectDetails[];
}
/**
 * Represents the fully detailed view of a project, including its core project data and
 * all associated frameworks.
 *
 * This interface is typically used in contexts where a project needs to be displayed
 * along with its related framework technologies.
 */
export interface IProjectDetails {
    /**
     * The main project entity containing metadata such as title, description, associated tags, etc.
     */
    Project: tableTypes.ProjectViewModel;

    /**
     * A list of frameworks associated with the project.
     * Each entry links a framework to the project through a many-to-many relationship.
     */
    ProjectFrameworks: tableTypes.ProjectFrameworkViewModel[];
}

/**
 * Represents a structured cache of all project-related tags used for categorization and filtering.
 *
 * This interface is typically used to store or serve tag data that can be applied to projects,
 * such as development types, programming languages, frameworks, database technologies,
 * and application industries. It allows for efficient access and reuse of tag metadata,
 * especially when rendering filters or forms in the UI.
 */
export interface IProjectTags {
    /**
     * A list of all available development types (e.g., Web, Mobile, Desktop).
     */
    DevTypes: tableTypes.DevTypeViewModel[];
    /**
     * A list of programming languages used across projects (e.g., JavaScript, Python).
     */
    ProgrammingLanguages: tableTypes.ProgrammingLanguageViewModel[];
    /**
     * A list of frameworks that can be associated with projects (e.g., React, Django).
     */
    Frameworks: tableTypes.FrameworkViewModel[];
    /**
     * A list of database technologies (e.g., MySQL, MongoDB).
     */
    DatabaseTechnologies: tableTypes.DatabaseTechnologyViewModel[];
    /**
     * A list of industries or sectors for project applications (e.g., Education, Healthcare).
     */
    ApplicationIndustries: tableTypes.ApplicationIndustryViewModel[];
}

//#endregion ProjectsCache

//#region SearchCache

export interface ISearchMap {
    Projects: ProjectSearchRecord
}

export type ProjectSearchRecord = Record<string, IProjectSearchCache>;

export interface IProjectSearchCache {
    SearchHash: string;
    SearchCount: number;
    SearchDate: Date;
}

//#endregion SearchCache

//#region UserCache

/**
 * A View Model for the User Cache.
 *
 * This interface represents the structure used to cache data
 * 
 * @property {Record<string, User>} Users - A mapping of usernames to users.
 * Each key is a username, and the corresponding value is the user object.
 */
export interface IUserCache {
    Users: Record<string, tableTypes.UserViewModel>
}

//#endregion UserCache

//#region ICache

/**
 * @interface ICache
 * @description Represents the basic structure for a cache entry, including metadata about its creation and last access time.
 */
export interface ICache {
    /**
     * The timestamp when the cache was created.
     */
    CreatedOn: Date;
    /**
     * The timestamp when this cache was last loaded or refreshed.
     */
    LastAccessed: Date;
    /**
     * 
     */
    ViewCount: number;
}

//#endregion