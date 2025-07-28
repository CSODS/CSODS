import { CSODS_API_PATHS } from "@/constants";
import { IAllProjectTags } from "@/types";
import { csodsClient } from "./csodsClient";

// todo: add better type guarding
export async function requestAllTags(): Promise<IAllProjectTags | null> {
  const { PATH, ALL_DATA } = CSODS_API_PATHS.PROJECT_TAGS;
  const endpoint = PATH + ALL_DATA;

  const data = await csodsClient
    .get(endpoint)
    .then((response) => response.data)
    .catch((err) => null);

  return data as IAllProjectTags;
}
