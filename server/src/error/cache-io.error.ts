import { ErrorBase } from "@/error";

export namespace CacheIO {
  export type ErrorName =
    | "CACHE_IO_LOAD_ERROR"
    | "CACHE_IO_PARSE_ERROR"
    | "CACHE_IO_PERSIST_ERROR"
    | "CACHE_IO_INVALID_CACHE_ERROR";

  export class ErrorClass extends ErrorBase<ErrorName> {}
}
