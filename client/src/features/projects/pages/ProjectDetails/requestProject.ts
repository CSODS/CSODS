import { IProjectDetails, IProjectSearchParameters } from "@/types";
import { csodsClient } from "@/utils";
import { API } from "@features/projects/constants";
import { assembleQuery } from "@features/projects/utils";

// todo: add better type guarding
export async function requestProject(
  pageNumber: string | number,
  projectId: string | number,
  searchParameters?: IProjectSearchParameters
): Promise<IProjectDetails | null> {
  const { PATH } = API.PROJECT_ENDPOINTS;
  const projectsPath = `${PATH}/${pageNumber}/${projectId}`;
  const query = assembleQuery(searchParameters);
  const endpoint = projectsPath + query;

  const data = await csodsClient
    .get(endpoint)
    .then((response) => response.data)
    .catch((err) => null);

  return data as IProjectDetails | null;
}
