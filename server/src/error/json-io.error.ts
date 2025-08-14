import { ErrorBase } from "@/error";

export namespace JsonIO {
  export type ErrorName =
    | "JSON_IO_FILE_NOT_FOUND_ERROR"
    | "JSON_IO_PARSE_ERROR"
    | "JSON_IO_WRITE_ERROR"
    | "JSON_IO_DELETE_ERROR"
    | "JSON_IO_INVALID_MODEL_ERROR"
    | "JSON_IO_NULL_DATA_ERROR";

  export class ErrorClass extends ErrorBase<ErrorName> {}
}
