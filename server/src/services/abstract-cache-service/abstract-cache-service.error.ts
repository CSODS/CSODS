import { ErrorBase } from "@/error";

export namespace CacheIO {
  export type ErrorName =
    | "CACHE_LOAD_ERROR"
    | "CACHE_PARSE_ERROR"
    | "INVALID_CACHE_ERROR"
    | "CACHE_PERSIST_ERROR";

  export class ErrorClass extends ErrorBase<ErrorName> {}
}
