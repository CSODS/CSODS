import { csodsClient } from "@/utils";
import { API } from "../constants";
import { IAllProjectTags } from "../types";

// todo: add better type guarding
export async function requestAllTags(
  abortSignal: AbortSignal
): Promise<IAllProjectTags | null> {
  const { PATH, ALL_DATA } = API.PROJECT_TAG_ENDPOINTS;
  const endpoint = PATH + ALL_DATA;

  const data = await csodsClient
    .get(endpoint, {
      signal: abortSignal,
    })
    .then((response) => response.data)
    .catch((err) => null);

  return data as IAllProjectTags | null;
}
