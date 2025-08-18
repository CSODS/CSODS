import { Request, Response } from "express";
import { StatusCode } from "@/utils";
import { StatusCodeMap } from "../constants";

//  todo: add docs
export async function getProjectTags(req: Request, res: Response) {
  const tagResult = await req.projectTagsDataService.getProjectTags();

  if (tagResult.success) {
    res.json(tagResult);
    return;
  }

  const statusCodeMap = StatusCodeMap.ProjectTagsError;
  const { name: errorName } = tagResult.error;
  res
    .status(StatusCode.fromError({ errorName, statusCodeMap }))
    .json(tagResult);
}
