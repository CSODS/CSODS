import { ADDRESSES } from "@/constants";
import { IProjectSearchParameters } from "../types";
import { assembleQuery } from "@/utils";

export function getProjectLink(
  pageNumber: number,
  projectId: number,
  searchParameters?: IProjectSearchParameters
) {
  const pagePath = `${ADDRESSES.STUDENT_PROJECTS.ROOT}/${pageNumber}`;
  const detailsPath = `${ADDRESSES.PROJECT_DETAILS.ROOT}/${projectId}`;
  const query = assembleQuery(searchParameters);
  return `${pagePath}${detailsPath}${query}`;
}
