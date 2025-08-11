import { Request, Response } from "express";
import { ProjectErrorStatusCodeMap as statusCodeMap } from "../constants";
import { assembleFilter } from "../utils";
import { StatusCode } from "@/utils";

export async function getProjectStore(req: Request, res: Response) {
  const dataService = req.projectDataService;
  const rawFilter = assembleFilter(req);

  const result = await dataService.getProjects(rawFilter);

  if (result.success) {
    res.json(result);
    return;
  }

  const { name: errorName } = result.error;
  res.status(StatusCode.fromError({ errorName, statusCodeMap })).json(result);
}
