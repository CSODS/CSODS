import { Request, Response } from "express";
import winston from "winston";
import { RouteLogger } from "./logger.util";

export class RouteLogHelper {
  private readonly _req: Request;
  private readonly _res: Response;
  private readonly _logger: winston.Logger;

  public constructor(req: Request, res: Response) {
    this._req = req;
    this._res = res;
    this._logger = RouteLogger;
  }

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

  public logStatus(statusCode: number, resMsg: string, err?: unknown): void {
    if (err) this.log("error", resMsg, err);
    else this.log("debug", resMsg);

    this._res
      .status(statusCode)
      .json({ message: `[Status ${statusCode}] ${resMsg}` });
  }
}
