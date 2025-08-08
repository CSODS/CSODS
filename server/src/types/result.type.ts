import { ErrorBase } from "@/error";

export type Result<TResult, TError extends ErrorBase<string>> =
  | {
      success: true;
      result: TResult;
    }
  | {
      success: false;
      error: TError;
    };
