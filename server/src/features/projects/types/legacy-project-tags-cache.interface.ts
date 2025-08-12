import { StoreBase } from "@/viewmodels";
import * as tableTypes from "./project-viewmodels.type";

/**
 * @deprecated Pleas use `ProjectTagsStore`
 * Represents a structured cache of all project-related tags used for categorization and filtering.
 *
 * This interface is typically used to store or serve tag data that can be applied to projects,
 * such as development types, programming languages, frameworks, database technologies,
 * and application industries. It allows for efficient access and reuse of tag metadata,
 * especially when rendering filters or forms in the UI.
 */
export interface IProjectTagsCache extends StoreBase {
  /**
   * A list of all available development types (e.g., Web, Mobile, Desktop).
   */
  devTypes: tableTypes.DevType[];
  /**
   * A list of programming languages used across projects (e.g., JavaScript, Python).
   */
  programmingLanguages: tableTypes.ProgrammingLanguage[];
  /**
   * A list of frameworks that can be associated with projects (e.g., React, Django).
   */
  frameworks: tableTypes.Framework[];
  /**
   * A list of database technologies (e.g., MySQL, MongoDB).
   */
  databaseTechnologies: tableTypes.DatabaseTechnology[];
  /**
   * A list of industries or sectors for project applications (e.g., Education, Healthcare).
   */
  applicationIndustries: tableTypes.ApplicationIndustry[];
}
