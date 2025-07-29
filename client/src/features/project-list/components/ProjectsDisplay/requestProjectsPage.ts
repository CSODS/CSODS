import { IProjectSearchParameters, IProjectsPage } from "@/types";
import { API } from "@/features/projects/constants";
import { assembleQuery } from "@/features/projects/utils";
import { csodsClient } from "@/utils";

// todo: add better type guarding
export async function requestProjectsPage(
  pageNumber: string | number,
  searchParameters?: IProjectSearchParameters
): Promise<IProjectsPage | null> {
  const { PATH } = API.PROJECT_ENDPOINTS;
  const projectsPath = `${PATH}/${pageNumber}`;
  const query = assembleQuery(searchParameters);
  const endpoint = projectsPath + query;

  const data = await csodsClient
    .get(endpoint)
    .then((response) => response.data)
    .catch((err) => null);

  return data as IProjectsPage | null;
}
