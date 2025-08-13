import { MethodNames } from "@/types";
import winston from "winston";

export type MethodLoggers<T> = {
  info: LogCallback<T>;
  debug: LogCallback<T>;
  error: ErrorCallback<T>;
};

export type LogCallback<T> = (method: MethodNames<T>, message: string) => void;

export type ErrorCallback<T> = (
  method: MethodNames<T>,
  message: string,
  err?: unknown
) => void;

/**
 * @deprecated Use {@link MethodLoggers}
 */
export type MethodLogger<T> = (
  method: MethodNames<T>,
  message: string,
  err?: unknown
) => void;

/**
 * @description Creates a set of logger utility functions for a class's methods
 * using a provided `logger`.
 * @param {winston.Logger} logger The logger object.
 * @param level Deprecated parameter. No longer needed as the function will be
 * returning an anonymous object containing logger utilities with different
 * levels.
 * @returns A set of logger utility functions `info`, `debug`, and `error`.
 * @template T Must be a class.
 * @example
 * ```
 * class MyClass {
 *  private log: MethodLoggers<this>
 *
 *  constructor(logger: winston.Logger) {
 *    this.log = getMethodLoggers<this>(logger);
 *  }
 * }
 * ```
 * To use:
 * ```
 * this.log.info('myMethod', 'myMessage');
 * ```
 */
export function getMethodLoggers<T>(logger: winston.Logger): MethodLoggers<T> {
  const info = (method: MethodNames<T>, message: string) => {
    const logMsg = `[${String(method)}] ${message}`;
    logger.info(logMsg);
  };

  const debug = (method: MethodNames<T>, message: string) => {
    const logMsg = `[${String(method)}] ${message}`;
    logger.debug(logMsg);
  };

  const error = (method: MethodNames<T>, message: string, err?: unknown) => {
    const logMsg = `[${String(method)}] ${message}`;
    if (err) logger.error(message, { error: err });
    else logger.error(message);
  };

  return { info, debug, error };
}
