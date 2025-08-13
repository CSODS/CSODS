import { ErrorBase } from "@/error";

export namespace JsonService {
  export type ErrorName =
    | "JSON_FILE_NOT_FOUND_ERROR"
    | "JSON_PARSE_ERROR"
    | "JSON_WRITE_ERROR"
    | "JSON_DELETE_ERROR"
    | "INVALID_MODEL_ERROR"
    | "NULL_DATA_ERROR";

  export class ErrorClass extends ErrorBase<ErrorName> {}
}
