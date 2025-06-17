var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { asc, desc } from "drizzle-orm";
export class Repository {
    constructor(context, table) {
        this._dbContext = context;
        this._table = table;
    }
    /**
     * Retrieves a paginated list of rows from the database table, optionally applying a `WHERE` clause.
     *
     * The results are ordered by the specified column, either in ascending or descending order,
     * and limited to a specified number of rows per page. Supports offset-based pagination using
     * a 1-based page number.
     *
     * @param options.column - The column to use for sorting the result set.
     * @param options.isAscending - Whether to sort in ascending order (default is `true`).
     * @param options.pageSize - The number of rows to retrieve per page (default is 100).
     * @param options.pageNumber - The page number to retrieve (1-based index, default is 1).
     * @param options.whereClause - Optional SQL `WHERE` clause to filter the rows.
     *
     * @returns A promise that resolves to an array of typed rows (`TResult[]`).
     *
     * @example
     * const rows = await GetRows({
     *   column: Projects.ProjectId,
     *   isAscending: true,
     *   pageSize: 10,
     *   pageNumber: 2,
     *   whereClause: eq(Projects.LanguageId, 1)
     * });
     * // Retrieves items 11–20 of projects where LanguageId = 1, ordered by ProjectId ascending.
     */
    GetRows(options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const column = options.column;
            const isAscending = (_a = options.isAscending) !== null && _a !== void 0 ? _a : true;
            const whereClause = options.whereClause;
            const pageSize = (_b = options.pageSize) !== null && _b !== void 0 ? _b : 100;
            const pageNumber = (_c = options.pageNumber) !== null && _c !== void 0 ? _c : 1;
            const order = isAscending ? asc(column) : desc(column);
            const rows = yield this._dbContext
                .select()
                .from(this._table)
                .where(whereClause)
                .orderBy(order)
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
