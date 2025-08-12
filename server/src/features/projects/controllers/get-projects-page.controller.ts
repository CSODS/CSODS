import { Request, Response } from "express";
import { StatusCode } from "@/utils";
import { StatusCodeMap } from "../constants";
import type { ProjectPageResult } from "../types";
import { assembleFilter } from "../utils";

/**
 * todo: update docs
 * Response object follows type {@link ProjectPageResult}
 * @param req
 * @param res
 * @returns
 */
export async function getProjectsPage(req: Request, res: Response) {
  const rawFilter = assembleFilter(req);

  //  get page
  const dataService = req.projectDataService;
  const pageNumber = Number(req.params.page_number);
  const pageResult = await dataService.getOrCreatePage(pageNumber, rawFilter);

  if (pageResult.success) {
    res.json(pageResult);
    return;
  }

  const statusCodeMap = StatusCodeMap.ProjectError;
  const { name: errorName } = pageResult.error;
  res
    .status(StatusCode.fromError({ errorName, statusCodeMap }))
    .json(pageResult);
}
