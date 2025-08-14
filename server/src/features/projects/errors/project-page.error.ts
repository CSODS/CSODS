import { ErrorBase } from "@/error";

export namespace ProjectPage {
  export type ErrorName =
    | "PAGE_OUT_OF_BOUNDS_ERROR"
    | "MISSING_PAGE_ERROR"
    | "PAGE_RETRIEVAL_ERROR";
  export class ErrorClass extends ErrorBase<ErrorName> {}
}
