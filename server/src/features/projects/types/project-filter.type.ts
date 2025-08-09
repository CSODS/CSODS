/**
 * Represents a set of optional filters used to narrow down project queries.
 * Each field corresponds to a tag or classification applied to a project.
 *
 * This type is commonly used to build query conditions when retrieving
 * or caching project data.
 * todo: enforce camelCase for the fields
 */
export type ProjectFilter = {
  /**
   * A search key on project titles. All search keys are considered prefixes.
   */
  ProjectTitle?: string | undefined;
  /**
   * ID of the development type (e.g., web, mobile, desktop).
   */
  DevTypeId?: number | undefined;
  /**
   * ID of the programming language to filter by (matches either primary
   * or secondary language).
   */
  LanguageId?: number | undefined;
  /**
   * ID of the database technology used in the project.
   */
  DatabaseId?: number | undefined;
  /**
   * ID of the industry the project is associated with.
   */
  IndustryId?: number | undefined;
};
