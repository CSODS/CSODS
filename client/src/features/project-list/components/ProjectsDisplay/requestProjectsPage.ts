import { IProjectSearchParameters, IProjectsPage } from "@/types";
import { CSODS_API_PATHS } from "@/constants";
import { assembleQuery, csodsClient } from "@/utils";

// todo: add better type guarding
export async function requestProjectsPage(
  pageNumber: string | number,
  searchParameters?: IProjectSearchParameters
): Promise<IProjectsPage | null> {
  const { PATH } = CSODS_API_PATHS.PROJECTS;
  const projectsPath = `${PATH}/${pageNumber}`;
  const query = assembleQuery(searchParameters);
  const endpoint = projectsPath + query;

  const data = await csodsClient
    .get(endpoint)
    .then((response) => response.data)
    .catch((err) => null);

  return data as IProjectsPage | null;
}
