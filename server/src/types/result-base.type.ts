import { ErrorBase } from "@/error";

//  todo: update all implementations
export type ResultSuccess<TResult, TSource extends string = string> = {
  success: true;
  result: TResult;
  source?: TSource;
};

export type ResultFail<TError extends ErrorBase<string>> = {
  success: false;
  error: TError;
};
