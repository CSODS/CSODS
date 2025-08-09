import { ErrorBase } from "@/error";

export type ResultSuccess<TResult> = { success: true; result: TResult };

export type ResultFail<TError extends ErrorBase<string>> = {
  success: false;
  error: TError;
};

export type ResultBase<TResult, TError extends ErrorBase<string>> =
  | ResultSuccess<TResult>
  | ResultFail<TError>;
