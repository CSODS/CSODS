import { ErrorBase } from "./error-base";

export namespace DbAccess {
  export type ErrorName =
    | "DB_ACCESS_EXCEEDED_MAX_FETCH_RETRIES_ERROR"
    | "DB_ACCESS_EMPTY_TABLE_ERROR"
    | "DB_ACCESS_QUERY_ERROR";
  export class ErrorClass extends ErrorBase<ErrorName> {}
}
