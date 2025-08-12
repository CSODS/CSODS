import { Request, Response } from "express";
import { StatusCode } from "@/utils";
import { StatusCodeMap } from "../constants";
import { assembleFilter } from "../utils";

export async function getProjectStore(req: Request, res: Response) {
  const dataService = req.projectDataService;
  const rawFilter = assembleFilter(req);

  const result = await dataService.getProjects(rawFilter);

  if (result.success) {
    res.json(result);
    return;
  }

  const statusCodeMap = StatusCodeMap.ProjectError;
  const { name: errorName } = result.error;
  res.status(StatusCode.fromError({ errorName, statusCodeMap })).json(result);
}
