import { drizzle } from "drizzle-orm/libsql";
import { asc, InferSelectModel } from "drizzle-orm";
import { AnySQLiteColumn, SQLiteSelect, SQLiteTable } from "drizzle-orm/sqlite-core";
import { createContext } from "../../db/csods";
import { Project } from "../../viewmodels/dbModels";

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

    public async GetRows(
        column: AnySQLiteColumn, 
        pageSize: number, 
        pageNumber: number
    ): Promise<TResult[]> {
        const rows = await this._dbContext
            .select()
            .from(this._table)
            .orderBy(asc(column))
            .limit(pageSize)
            .offset(pageSize * (pageNumber - 1));
        
        return rows as TResult[];
    }

    public async GetCount() : Promise<number> {
        return await this._dbContext.$count(this._table);
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