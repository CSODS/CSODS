import { Cache, Db } from "@/error";
import { Exhaustive } from "@/types";

export namespace StatusCodeMap {
  export const CacheError: Exhaustive<Cache.ErrorName> = {
    CREATE_NEW_CACHE_ERROR: 500,
    BACKUP_CACHE_READONLY_MODIFICATION_ERROR: 500,
    LOAD_BACKUP_ERROR: 500,
    LOAD_FROM_CACHE_ERROR: 500,
  } as const;

  export const DbError: Exhaustive<Db.ErrorName> = {
    EXCEEDED_MAX_FETCH_RETRIES_ERROR: 500,
    EMPTY_TABLE_ERROR: 500,
    DB_FETCH_ERROR: 500,
  } as const;
}
