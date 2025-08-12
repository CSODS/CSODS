import { Request, Response } from "express";
import { StatusCode } from "@/utils";
import { ProjectErrorStatusCodeMap as statusCodeMap } from "../constants";
import type { IProjectDetails } from "../types";
import { assembleFilter } from "../utils";

/**
 * todo: update docs
 *
 * Result object follows shape of type {@link IProjectDetails}.
 * @param req
 * @param res
 * @returns
 */
export async function getProject(req: Request, res: Response) {
  const { page_number, project_id } = req.params;
  const rawFilter = assembleFilter(req);

  const dataService = req.projectDataService;
  const projectResult = await dataService.getProjectByPageAndId({
    pageNumber: Number(page_number),
    projectId: Number(project_id),
    rawFilter,
  });

  if (projectResult.success) {
    res.json(projectResult);
    return;
  }

  const { name: errorName } = projectResult.error;
  res
    .status(StatusCode.fromError({ errorName, statusCodeMap }))
    .json(projectResult);
}
