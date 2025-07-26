import { Request, Response } from "express";
import winston from "winston";
import { RouteLogger } from "./logger.util";

/**
 * @public
 * @function createRouteLogHelper
 * @description Creates a new instance of the {@link RouteLogHelper} using
 * the `request` and `response` objects. Used for attaching to the `request`
 * as a middleware.
 * @param req
 * @param res
 * @returns
 */
export function createRouteLogHelper(req: Request, res: Response) {
  return new RouteLogHelper(req, res);
}

/**
 * @type MsgOptions
 * @description A type used for the `msg` parameter of the {@link RouteLogHelper.logStatus()}
 * method. Contains the fields:
 * - {@link logMsg} - The log message.
 * - {@link resMsg} - The response message.
 */
type MsgOptions = {
  logMsg: string;
  resMsg: string;
};

/**
 * @public
 * @class RouteLogHelper
 * @description A utility logger class used for logging request lifecycles.
 * Used for logging requests from arrivals, to middleware, until the controller
 * finishes executing.
 * - Contains utility functions for logging plain winston, as well as responding
 * with status codes and custom json message responses using the {@link Response} object.
 * - Uses the {@link Request} object for creating a log message header.
 * - Uses the {@link RouteLogger} for logging to transports.
 */
export class RouteLogHelper {
  private readonly _req: Request;
  private readonly _res: Response;
  private readonly _logger: winston.Logger;

  public constructor(req: Request, res: Response) {
    this._req = req;
    this._res = res;
    this._logger = RouteLogger;
  }

  /**
   * @public
   * @function logStatus
   * @description Logs and sends a response with provided status code and {@link msg}.
   * - If an `Error` object is passed, the function defaults to logging with an `error`
   * level. Otherwise, use the `debug` level.
   * - The function may receive either a plain `string` or a {@link MsgOptions} object
   * for the message.
   * - The log and response will share the same message if it is a plain string.
   * - The log and response can optionally have different custom messages if a
   * {@link MsgOptions} object was received instead.
   * @param statusCode The status code of the response.
   * @param msg The message contents. Can either be a shared message for both log and response
   * if it is a plain `string` or a custom message for both if it is a {@link MsgOptions}.
   * @param err An `Error` object passed into the log.
   * TODO: add status code verification.
   */
  public logStatus(
    statusCode: number,
    msg: string | MsgOptions,
    err?: unknown
  ): void {
    const { logMsg, resMsg } = this.__extractMessages(msg);

    if (err) this.log("error", logMsg, err);
    else this.log("debug", logMsg);

    this._res
      .status(statusCode)
      .json({ message: `[Status ${statusCode}] ${resMsg}` });
  }

  /**
   * @public
   * @function log
   * @description Logs a provided {@link msg} using the {@link RouteLogger}.
   * - Optionally includes the {@link err} object in the `log` if it is provided
   * and the {@link level} is specified as `error`.
   * @param level The level of the error. Can be either `error`, `warn`, `info`, or `debug`.
   * @param msg The log message.
   * @param err An `Error` object passed into the log.
   * todo: possible include other levels as well.
   * todo: encapsulate log header construction logic if it becomes too verbose or complicated.
   */
  public log(
    level: "error" | "warn" | "info" | "debug",
    msg: string,
    err?: unknown
  ): void {
    const { method, originalUrl } = this._req;
    const logHeader = `[${method} ${originalUrl}]`;
    const logMsg = `${logHeader} ${msg}`;

    level === "error" && err
      ? this._logger.log(level, logMsg, err)
      : this._logger.log(level, logMsg);
  }

  /**
   * @private
   * @function __extractMessages
   * @description Helper function for extracting the message from the
   * {@link msg} parameter. If {@link msg} is a `string`, returns a {@link MsgOptions}
   * object containing the same message for both the log and response. Otherwise,
   * just return the {@link msg} as is.
   * @param msg A `string` or {@link MsgOptions} object containing the details of the
   * log and/or response message.
   * @returns
   */
  private __extractMessages(msg: string | MsgOptions): MsgOptions {
    if (typeof msg === "string") {
      return { logMsg: msg, resMsg: msg } as MsgOptions;
    }

    return msg;
  }
}
