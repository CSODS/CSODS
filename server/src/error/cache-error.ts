import { ErrorBase } from "./error-base";

export namespace Cache {
  export type ErrorName =
    | "LOAD_FROM_CACHE_ERROR"
    | "LOAD_BACKUP_ERROR"
    | "CREATE_NEW_CACHE_ERROR"
    | "BACKUP_CACHE_READONLY_MODIFICATION_ERROR";

  export class ErrorClass extends ErrorBase<ErrorName> {}
}
