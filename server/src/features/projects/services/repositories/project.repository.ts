import { eq, and, or, like } from "drizzle-orm";
import { DbContext } from "@/db/csods.js";
import { Project } from "@models";
import { Repository } from "@services";
import { ProjectsTable, ProjectViewModel } from "../../types";

export class ProjectRepository extends Repository<ProjectsTable> {
  public constructor(context: DbContext) {
    super(context, Project);
  }
  /**
   * Retrieves a paginated list of projects from the database, optionally applying filters.
   *
   * Projects are fetched using the specified `pageSize` and `pageNumber`, with support for
   * filtering based on the fields in the `IProjectFilter` object.
   *
   * @param pageSize The number of projects to retrieve per page.
   * @param pageNumber The 1-based page number to fetch.
   * @param filter Optional filter criteria for narrowing down results (e.g., by language, type, etc.).
   *
   * @returns A promise that resolves to an array of `Project` entities for the given page.
   *
   * @example
   * const projects = await getProjects(10, 2, { LanguageId: 3 });
   * // Fetches the second page of projects filtered by LanguageId = 3
   */
  public async getProjects(options?: {
    isAscending?: boolean | undefined;
    filter?: IProjectFilter | undefined;
    pageSize?: number | undefined;
    pageNumber?: number | undefined;
  }): Promise<ProjectViewModel[]> {
    const isAscending = options?.isAscending ?? true;
    const filter = options?.filter;
    const pageSize = options?.pageSize ?? 100;
    const pageNumber = options?.pageNumber ?? 1;

    //  apply filters as specified.
    const whereClause = this.buildWhereClause(filter);

    //  get rows and return.
    return await this.GetRows({
      column: Project.projectId,
      isAscending: isAscending,
      whereClause: whereClause,
      pageSize: pageSize,
      pageNumber: pageNumber,
    });
  }
  /**
   * Counts the total number of projects in the database, optionally applying filters.
   *
   * If no filter is provided, the total count of all projects is returned.
   *
   * @param filter Optional filter criteria to count only matching project records.
   *
   * @returns A promise resolving to the number of projects matching the criteria.
   *
   * @example
   * const count = await countProjects({ DevTypeId: 1 });
   * // Returns how many projects use development type ID 1
   */
  public async countProjects(filter?: IProjectFilter): Promise<number> {
    const whereClause = this.buildWhereClause(filter);

    return await this.GetCount(whereClause);
  }
  /**
   * Constructs a dynamic SQL `WHERE` clause based on the provided filter options.
   *
   * The method builds a list of conditions using the fields in the `IProjectFilter` object.
   * If no filters are provided or all are `undefined`, the resulting clause will be `undefined`.
   *
   * ### Filters:
   * - `ProjectTitle`: Matches the project's ProjectTitle in lowercase starting with the search key.
   * - `DevTypeId`: Matches the project's development type.
   * - `LanguageId`: Matches either the primary or secondary language of the project.
   * - `DatabaseId`: Matches the project's database technology.
   * - `IndustryId`: Matches the industry to which the project belongs.
   *
   * @param filter An optional `IProjectFilter` object used to determine which conditions to include.
   * @returns A SQL `WHERE` clause composed using `and(...)`, or `undefined` if no conditions are set.
   *
   * @example
   * const where = buildWhereClause({ DevTypeId: 1, LanguageId: 2 });
   * // Generates: AND(Projects.DevTypeId = 1, (Projects.PrimaryLanguageId = 2 OR Projects.SecondaryLanguageId = 2))
   */
  public buildWhereClause(filter?: IProjectFilter | undefined) {
    const conditions = [];
    if (filter) {
      if (filter.ProjectTitle !== undefined)
        conditions.push(
          like(Project.projectTitleLower, `${filter.ProjectTitle}%`)
        );

      if (filter.DevTypeId !== undefined)
        conditions.push(eq(Project.devTypeId, filter.DevTypeId));

      if (filter.LanguageId !== undefined)
        conditions.push(
          or(
            eq(Project.primaryLanguageId, filter.LanguageId),
            eq(Project.secondaryLanguageId, filter.LanguageId)
          )
        );

      if (filter.DatabaseId !== undefined)
        conditions.push(eq(Project.databaseTechnologyId, filter.DatabaseId));

      if (filter.IndustryId !== undefined)
        conditions.push(eq(Project.applicationIndustryId, filter.IndustryId));
    }

    //  build where clause.
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    return whereClause;
  }
}

//#region ProjectFilter

/**
 * A utility class that encapsulates and manages project filter criteria.
 * Implements the `IProjectFilter` interface and provides helper methods
 * for evaluating and representing filters in list form.
 */
export class ProjectFilter implements IProjectFilter {
  ProjectTitle: string | undefined;
  DevTypeId: number | undefined;
  LanguageId: number | undefined;
  DatabaseId: number | undefined;
  IndustryId: number | undefined;

  /**
   * Constructs a `ProjectFilter` instance from an optional `IProjectFilter` object.
   *
   * @param filter Optional object containing filter criteria.
   */
  constructor(filter?: IProjectFilter) {
    const title = filter?.ProjectTitle;
    //  Normalize empty titles into undefined data type.
    this.ProjectTitle = title && title.length > 0 ? title : undefined;
    this.DevTypeId = filter?.DevTypeId;
    this.LanguageId = filter?.LanguageId;
    this.DatabaseId = filter?.DatabaseId;
    this.IndustryId = filter?.IndustryId;
  }

  /**
   * Returns the filter values as an array of strings.
   * If a filter is not set, it is represented as `'NA'`.
   *
   * @returns An array of stringified filter values in the order:
   * `[DevTypeId, LanguageId, DatabaseId, IndustryId]`
   */
  public getFilterList(): string[] {
    const filterList = Object.values(this).map((value) => {
      return value !== undefined ? value.toString() : "NA";
    });
    return filterList;
  }

  public hasProjectSearchKey(): boolean {
    return this.ProjectTitle !== undefined;
  }

  /**
   * Checks if all filters are unset (i.e., no filter criteria applied).
   *
   * @returns `true` if no filters are set; `false` otherwise.
   */
  public isEmpty(): boolean {
    return !this.hasFilter();
  }

  /**
   * Internal helper to check if at least one filter is defined.
   *
   * @returns `true` if any filter is set; `false` if all are undefined.
   */
  private hasFilter(): boolean {
    return Object.values(this).some((val) => val !== undefined);
  }
}
/**
 * Represents a set of optional filters used to narrow down project queries.
 * Each field corresponds to a tag or classification applied to a project.
 *
 * This interface is commonly used to build query conditions when retrieving
 * or caching project data.
 */
export interface IProjectFilter {
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
}

//#endregion ProjectFilter
