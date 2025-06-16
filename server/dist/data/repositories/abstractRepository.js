var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { asc } from "drizzle-orm";
export class Repository {
    constructor(context, table) {
        this._dbContext = context;
        this._table = table;
    }
    /**
     * Retrieves a paginated list of rows from the database table, optionally applying a WHERE clause.
     *
     * Results are ordered in ascending order by the specified column and limited to the given page size.
     * Supports offset-based pagination using the provided page number.
     *
     * @param column The column to use for sorting the result set in ascending order.
     * @param pageSize The number of rows to fetch per page.
     * @param pageNumber The page number to retrieve (1-based index).
     * @param whereClause Optional SQL condition to filter the rows.
     *
     * @returns A promise that resolves to an array of typed rows (`TResult[]`).
     *
     * @example
     * const rows = await GetRows(Projects.ProjectId, 10, 2, eq(Projects.LanguageId, 1));
     * // Retrieves page 2 (items 11–20) of projects using LanguageId = 1
     */
    GetRows(column, pageSize, pageNumber, whereClause) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield this._dbContext
                .select()
                .from(this._table)
                .where(whereClause)
                .orderBy(asc(column))
                .limit(pageSize)
                .offset(pageSize * (pageNumber - 1));
            return rows;
        });
    }
    /**
     * Counts the number of rows in the current table, optionally using a WHERE clause.
     *
     * @param whereClause Optional SQL condition to restrict which rows are counted.
     *
     * @returns A promise resolving to the total count of matching rows.
     *
     * @example
     * const total = await GetCount(eq(Projects.DevTypeId, 2));
     * // Returns the number of projects with DevTypeId = 2
     */
    GetCount(whereClause) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._dbContext.$count(this._table, whereClause);
        });
    }
}
// export abstract class CustomQuery<TEntity extends SQLiteTable, TSelf extends CustomQuery<TEntity, TSelf>> {
//     protected query;
//     protected constructor(query:SQLiteSelect) {
//         this.query = query;
//     }
//     public GetQuery(): SQLiteSelect {
//         return this.query;
//     }
//     public SkipBy(skipCount:number): TSelf {
//         const newQuery = this.query.offset(skipCount);
//         return this.cloneWithQuery(newQuery);
//     }
//     public TakeWithCount(takeCount:number): TSelf {
//         const newQuery = this.query.limit(takeCount);
//         return this.cloneWithQuery(newQuery);
//     }
//     protected abstract cloneWithQuery(query: SQLiteSelect): TSelf;
// }
