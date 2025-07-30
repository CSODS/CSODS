import { API } from "@features/projects/constants";
import {
  IProjectDetails,
  IProjectSearchParameters,
} from "@/features/projects/types";
import { assembleQuery } from "@features/projects/utils";
import { csodsClient } from "@/utils";

// todo: add better type guarding
export async function requestProject(
  abortSignal: AbortSignal,
  pageNumber: string | number,
  projectId: string | number,
  searchParameters?: IProjectSearchParameters
): Promise<IProjectDetails | null> {
  const { PATH } = API.PROJECT_ENDPOINTS;
  const projectsPath = `${PATH}/${pageNumber}/${projectId}`;
  const query = assembleQuery(searchParameters);
  const endpoint = projectsPath + query;

  const data = await csodsClient
    .get(endpoint, {
      signal: abortSignal,
    })
    .then((response) => response.data)
    .catch((err) => null);

  return data as IProjectDetails | null;
}
