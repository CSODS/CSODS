import { ErrorBase } from "@/error";
import { ResultFail, ResultSuccess } from "@/types";

/**
 * @description Returns a success result object with the given payload.
 * @param result The successful result data.
 * @returns An object with shape `{ success: true, result: TResult }`.
 */
export function success<TResult, TSource extends string = string>(
  result: TResult,
  source?: TSource
): ResultSuccess<TResult, TSource> {
  return {
    success: true,
    result,
    source,
  };
}

/**
 * @description Returnsa fail result object with the given error.
 * The error object must extend the {@link ErrorBase} shape.
 *
 * @template TError The specific error type extending {@link ErrorBase}
 * @param error The error object to wrap in the failure result.
 * @returns An object with shape `{ success: false, error: TError }`.
 *
 * @remarks The error object should conform to the shape defined by
 * `ErrorBase<E extends string>`
 * ```
 * { name: E, message: string, cause?: any }
 * ```
 *
 * @example
 * ```ts
 * const err = new MyCustomError("Some error message");
 * const failureResult = fail(err);
 * failureResult has shape { success: false, error: MyCustomError }
 * ```
 */
export function fail<TError extends ErrorBase<string>>(
  error: TError
): ResultFail<TError> {
  return {
    success: false,
    error,
  };
}
