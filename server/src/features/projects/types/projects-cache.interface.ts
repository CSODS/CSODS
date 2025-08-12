import { StoreBase } from "@/viewmodels";
import * as tableTypes from "./project-viewmodels.type";

/**
 * A View Model for the Project Cache.
 *
 * This interface represents the structure used to cache paginated project data,
 * enabling efficient retrieval and display in a paginated view.
 */
export interface IProjectCache extends StoreBase {
  /**
   * The total number of available pages of projects.
   */
  totalPages: number;
  /**
   * Flags if the cache is a backup cache.
   */
  isBackup: boolean;
  /**
   * A mapping of page numbers to CachePage objects.
   * Each key is a page number, and the corresponding value is a CachePage instance
   * representing cached data for that page.
   */
  cachePages: CachePageRecord;
}

export type CachePageRecord = Record<number, IProjectCachePage>;

/**
 * Represents a cached page of projects within the ProjectCache.
 */
export interface IProjectCachePage extends StoreBase {
  /**
   * The total number of available pages of projects.
   */
  totalPages: number;
  /**
   * The project list associated with this page.
   */
  projects: IProjectDetails[];
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
  project: tableTypes.ProjectViewModel;

  /**
   * A list of frameworks associated with the project.
   * Each entry links a framework to the project through a many-to-many relationship.
   */
  projectFrameworks: tableTypes.ProjectFrameworkViewModel[];
}
