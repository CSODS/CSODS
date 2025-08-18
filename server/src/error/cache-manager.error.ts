import { ErrorBase } from "./error-base";

export namespace CacheManager {
  export type ErrorName =
    | "CACHE_MANAGER_BACKUP_READONLY_MODIFICATION_ERROR"
    | "CACHE_MANAGER_CREATE_NEW_ERROR"
    | "CACHE_MANAGER_LOAD_PRIMARY_ERROR"
    | "CACHE_MANAGER_LOAD_BACKUP_ERROR";

  export class ErrorClass extends ErrorBase<ErrorName> {}
}
