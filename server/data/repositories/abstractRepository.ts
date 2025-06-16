import { asc, InferSelectModel, SQL } from "drizzle-orm";
import { AnySQLiteColumn, SQLiteTable } from "drizzle-orm/sqlite-core";
import { createContext } from "../../db/csods";

type DbContext = Awaited<ReturnType<typeof createContext>>;

export abstract class Repository<
    TTable extends SQLiteTable, 
    TResult = InferSelectModel<TTable>
> {
    protected _dbContext: DbContext;
    protected _table: SQLiteTable;

    protected constructor (context: DbContext, table:TTable) {
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
    protected async GetRows(
        column: AnySQLiteColumn, 
        pageSize: number, 
        pageNumber: number,
        whereClause?: SQL
    ): Promise<TResult[]> {

        const rows = await this._dbContext
            .select()
            .from(this._table)
            .where(whereClause)
            .orderBy(asc(column))
            .limit(pageSize)
            .offset(pageSize * (pageNumber - 1));
        
        return rows as TResult[];
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
    protected async GetCount(whereClause?: SQL) : Promise<number> {
        return await this._dbContext.$count(this._table, whereClause);
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