import { StoreBase } from "@/viewmodels";
import type { ViewModels } from ".";

export namespace ProjectStoreModels {
  /**
   * A View Model for the Project Store.
   *
   * This interface represents the structure used to store paginated project data,
   * enabling efficient retrieval and display in a paginated view.
   */
  export type Store = {
    /**
     * The total number of available pages of projects.
     */
    totalPages: number;
    /**
     * Flags if the cache is a backup cache.
     */
    isBackup: boolean;
    /**
     * A mapping of page numbers to ProjectPage objects.
     * Each key is a page number, and the corresponding value is a ProjectPage instance
     * representing stored data for that page.
     */
    pages: PageRecord;
  } & StoreBase;

  export type PageRecord = Record<number, Page>;

  /**
   * Represents a stored page of projects within the ProjectStore.
   */
  export type Page = {
    /**
     * The total number of available pages of projects.
     */
    totalPages: number;
    /**
     * The project list associated with this page.
     */
    projects: ProjectDetails[];
  } & StoreBase;

  /**
   * Represents the fully detailed view of a project, including its core project data and
   * all associated frameworks.
   *
   * This interface is typically used in contexts where a project needs to be displayed
   * along with its related framework technologies.
   */
  export type ProjectDetails = {
    /**
     * The main project entity containing metadata such as title, description, associated tags, etc.
     */
    project: ViewModels.ProjectViewModel;
    /**
     * A list of frameworks associated with the project.
     * Each entry links a framework to the project through a many-to-many relationship.
     */
    projectFrameworks: ViewModels.ProjectFrameworkViewModel[];
  };
}
