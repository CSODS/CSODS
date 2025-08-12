import { StoreBase } from "@/viewmodels";
import { ViewModels } from ".";

export namespace ProjectTags {
  /**
   * Represents a structured store of all project-related tags used for categorization and filtering.
   *
   * This interface is typically used to store or serve tag data that can be applied to projects,
   * such as development types, programming languages, frameworks, database technologies,
   * and application industries. It allows for efficient access and reuse of tag metadata,
   * especially when rendering filters or forms in the UI.
   */
  export type Store = {
    /**
     * A list of all available development types (e.g., Web, Mobile, Desktop).
     */
    devTypes: ViewModels.DevTypeViewModel[];
    /**
     * A list of programming languages used across projects (e.g., JavaScript, Python).
     */
    programmingLanguages: ViewModels.ProgrammingLanguageViewModel[];
    /**
     * A list of frameworks that can be associated with projects (e.g., React, Django).
     */
    frameworks: ViewModels.FrameworkViewModel[];
    /**
     * A list of database technologies (e.g., MySQL, MongoDB).
     */
    databaseTechnologies: ViewModels.DatabaseTechnologyViewModel[];
    /**
     * A list of industries or sectors for project applications (e.g., Education, Healthcare).
     */
    applicationIndustries: ViewModels.ApplicationIndustryViewModel[];
  } & StoreBase;
}
