import { ErrorBase } from "@/error";

export type ErrorName =
  | "CACHE_LOAD_ERROR"
  | "CACHE_PARSE_ERROR"
  | "INVALID_CACHE_ERROR"
  | "CACHE_PERSIST_ERROR";

export class CacheError extends ErrorBase<ErrorName> {}
