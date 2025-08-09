import { ErrorBase } from "@/error";
import { ResultBase, ResultFail, ResultSuccess } from "@/types";

export function success<TResult>(result: TResult): ResultSuccess<TResult> {
  return {
    success: true,
    result,
  };
}

export function fail<TError extends ErrorBase<string>>(
  error: TError
): ResultFail<TError> {
  return {
    success: false,
    error,
  };
}
