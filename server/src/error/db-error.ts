import { ErrorBase } from "./error-base";

export namespace Db {
  export type ErrorName =
    | "EXCEEDED_MAX_FETCH_RETRIES_ERROR"
    | "EMPTY_TABLE_ERROR"
    | "DB_FETCH_ERROR";
  export class ErrorClass extends ErrorBase<ErrorName> {}
}
