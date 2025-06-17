var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Projects } from '../../db/schema.js';
import { Repository } from './abstractRepository.js';
import { eq, and, or, like } from 'drizzle-orm';
export default class ProjectRepository extends Repository {
    constructor(context) {
        super(context, Projects);
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
    getProjects(options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const isAscending = (_a = options === null || options === void 0 ? void 0 : options.isAscending) !== null && _a !== void 0 ? _a : true;
            const filter = options === null || options === void 0 ? void 0 : options.filter;
            const pageSize = (_b = options === null || options === void 0 ? void 0 : options.pageSize) !== null && _b !== void 0 ? _b : 100;
            const pageNumber = (_c = options === null || options === void 0 ? void 0 : options.pageNumber) !== null && _c !== void 0 ? _c : 1;
            //  apply filters as specified.
            const whereClause = this.buildWhereClause(filter);
            //  get rows and return.
            return yield this.GetRows({
                column: Projects.ProjectId,
                isAscending: isAscending,
                whereClause: whereClause,
                pageSize: pageSize,
                pageNumber: pageNumber
            });
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
    countProjects(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const whereClause = this.buildWhereClause(filter);
            return yield this.GetCount(whereClause);
        });
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
    buildWhereClause(filter) {
        const conditions = [];
        if (filter) {
            if (filter.ProjectTitle !== undefined)
                conditions.push(like(Projects.ProjectTitleLower, `${filter.ProjectTitle}%`));
            if (filter.DevTypeId !== undefined)
                conditions.push(eq(Projects.DevTypeId, filter.DevTypeId));
            if (filter.LanguageId !== undefined)
                conditions.push(or(eq(Projects.PrimaryLanguageId, filter.LanguageId), eq(Projects.SecondaryLanguageId, filter.LanguageId)));
            if (filter.DatabaseId !== undefined)
                conditions.push(eq(Projects.DatabaseTechnologyId, filter.DatabaseId));
            if (filter.IndustryId !== undefined)
                conditions.push(eq(Projects.ApplicationIndustryId, filter.IndustryId));
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
export class ProjectFilter {
    /**
     * Constructs a `ProjectFilter` instance from an optional `IProjectFilter` object.
     *
     * @param filter Optional object containing filter criteria.
     */
    constructor(filter) {
        const title = filter === null || filter === void 0 ? void 0 : filter.ProjectTitle;
        //  Normalize empty titles into undefined data type.
        this.ProjectTitle = title && title.length > 0 ? title : undefined;
        this.DevTypeId = filter === null || filter === void 0 ? void 0 : filter.DevTypeId;
        this.LanguageId = filter === null || filter === void 0 ? void 0 : filter.LanguageId;
        this.DatabaseId = filter === null || filter === void 0 ? void 0 : filter.DatabaseId;
        this.IndustryId = filter === null || filter === void 0 ? void 0 : filter.IndustryId;
    }
    /**
     * Returns the filter values as an array of strings.
     * If a filter is not set, it is represented as `'NA'`.
     *
     * @returns An array of stringified filter values in the order:
     * `[DevTypeId, LanguageId, DatabaseId, IndustryId]`
     */
    getFilterList() {
        const filterList = Object.values(this).map((value) => {
            return value !== undefined
                ? value.toString()
                : 'NA';
        });
        return filterList;
    }
    hasProjectSearchKey() {
        return this.ProjectTitle !== undefined;
    }
    /**
     * Checks if all filters are unset (i.e., no filter criteria applied).
     *
     * @returns `true` if no filters are set; `false` otherwise.
     */
    isEmpty() {
        return !this.hasFilter();
    }
    /**
     * Internal helper to check if at least one filter is defined.
     *
     * @returns `true` if any filter is set; `false` if all are undefined.
     */
    hasFilter() {
        return Object.values(this).some(val => val !== undefined);
    }
}
;
//#endregion ProjectFilter
