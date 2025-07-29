import { AuthUtils } from "@/core/auth";
import { API } from "@features/projects/constants";
import {
  IProjectDetails,
  IProjectSearchParameters,
} from "@/features/projects/types";
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

  const data = await AuthUtils.securedAxios
    .get(endpoint)
    .then((response) => response.data)
    .catch((err) => null);

  return data as IProjectDetails | null;
}
