import { ADDRESSES } from "@/constants";
import { IProjectSearchParameters } from "../types";
import { assembleQuery } from "./assembleQuery";

export function getProjectsPageLink(
  pageNumber: number,
  searchParameters?: IProjectSearchParameters
) {
  const root = ADDRESSES.STUDENT_PROJECTS.ROOT;
  const query = assembleQuery(searchParameters);
  const link = `${root}/${pageNumber}${query}`;
  return link;
}
