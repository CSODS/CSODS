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
    GetRows(column, pageSize, pageNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield this._dbContext
                .select()
                .from(this._table)
                .orderBy(asc(column))
                .limit(pageSize)
                .offset(pageSize * (pageNumber - 1));
            return rows;
        });
    }
    GetCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._dbContext.$count(this._table);
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
