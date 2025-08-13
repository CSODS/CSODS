import { CacheManager, Db } from "@/error";
import { Exhaustive } from "@/types";

export namespace StatusCodeMap {
  export const CacheManagerError: Exhaustive<CacheManager.ErrorName> = {
    CACHE_MANAGER_BACKUP_READONLY_MODIFICATION_ERROR: 500,
    CACHE_MANAGER_CREATE_NEW_ERROR: 500,
    CACHE_MANAGER_LOAD_BACKUP_ERROR: 500,
    CACHE_MANAGER_LOAD_PRIMARY_ERROR: 500,
  } as const;

  export const DbError: Exhaustive<Db.ErrorName> = {
    EXCEEDED_MAX_FETCH_RETRIES_ERROR: 500,
    EMPTY_TABLE_ERROR: 500,
    DB_FETCH_ERROR: 500,
  } as const;
}
