import {
  asc,
  desc,
  InferInsertModel,
  InferSelectModel,
  SQL,
} from "drizzle-orm";
import { AnySQLiteColumn, SQLiteTable } from "drizzle-orm/sqlite-core";
import { DbContext } from "@/db/csods";
import { DbLogger } from "@/utils";

export abstract class Repository<
  TTable extends SQLiteTable,
  TSelectResult = InferSelectModel<TTable>,
  TInsertModel = InferInsertModel<TTable>
> {
  protected _dbContext: DbContext;
  protected _table: SQLiteTable;

  protected constructor(context: DbContext, table: TTable) {
    this._dbContext = context;
    this._table = table;
  }
  /**
   * @protected
   * @async
   * @function insertRow
   * @description Asynchronously inserts a new row into a table and returns the inserted row if successful.
   * If the insert operation fails, logs the error and returns `null`.
   * @param newRow - The new row to be inserted.
   * @returns The inserted object if successful or `null` if the insert operation fails.
   */
  protected async insertRow(
    newRow: TInsertModel
  ): Promise<TSelectResult | null> {
    const inserted = await this._dbContext
      .insert(this._table)
      .values([newRow])
      .onConflictDoNothing()
      .returning()
      .then((result) => result[0]);
    return inserted ? (inserted as TSelectResult) : null;
  }
  /**
   * @protected
   * @async
   * @function GetFirst
   * @description Asynchronously retrieves a row from the database table, optionally applaying
   * a `WHERE` clause.
   *
   * @param options.whereClause - Optional SQL `WHERE` clause to filter the result.
   * @returns A promise that resolves to a typed row (`TResult`) or null if no row is found
   * or an error results while querying the database.
   */
  protected async GetFirst(options?: {
    whereClause?: SQL;
  }): Promise<TSelectResult | null> {
    try {
      const whereClause = options?.whereClause;

      const result = await this._dbContext
        .select()
        .from(this._table)
        .where(whereClause)
        .limit(1)
        .then((result) => result[0]);

      return result ? (result as TSelectResult) : null;
    } catch (err) {
      DbLogger.error(`[Repository] Failed fetch operation 'getFirst'.`, err);
      return null;
    }
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
  protected async GetRows(options: {
    column: AnySQLiteColumn;
    isAscending?: boolean;
    pageSize?: number | undefined;
    pageNumber?: number | undefined;
    whereClause?: SQL | undefined;
  }): Promise<TSelectResult[]> {
    const column = options.column;
    const isAscending = options.isAscending ?? true;
    const whereClause = options.whereClause;
    const pageSize = options.pageSize ?? 100;
    const pageNumber = options.pageNumber ?? 1;

    const order = isAscending ? asc(column) : desc(column);

    const rows = await this._dbContext
      .select()
      .from(this._table)
      .where(whereClause)
      .orderBy(order)
      .limit(pageSize)
      .offset(pageSize * (pageNumber - 1));

    return rows as TSelectResult[];
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
  protected async GetCount(whereClause?: SQL): Promise<number> {
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
