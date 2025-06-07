import { unique } from "drizzle-orm/gel-core";
import { integer,  text,sqliteTable} from "drizzle-orm/sqlite-core";

export const DevTypes = sqliteTable('DevTypes', {
    DevTypeId : integer('DevTypeId').unique().primaryKey({autoIncrement: true}),
    DevTypeName : integer('DevTypeName').unique()
});