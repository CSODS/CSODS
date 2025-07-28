import { IProjectDetails, IProjectSearchParameters } from "@/types";
import { csodsClient } from "./csodsClient";
import { CSODS_API_PATHS } from "@/constants";
import { assembleQuery } from "../navigation/navigation";

// todo: add better type guarding
export async function requestProjects(
  pageNumber: string | number,
  projectId: string | number,
  searchParameters?: IProjectSearchParameters
): Promise<IProjectDetails | null> {
  const { PATH } = CSODS_API_PATHS.PROJECTS;
  const projectsPath = `${PATH}/${pageNumber}/${projectId}`;
  const query = assembleQuery(searchParameters);
  const endpoint = projectsPath + query;

  const data = await csodsClient
    .get(endpoint)
    .then((response) => response.data)
    .catch((err) => null);

  return data as IProjectDetails;
}
