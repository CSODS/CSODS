import { IProjectSearchParameters } from "../types";

export function assembleQuery(searchParameters?: IProjectSearchParameters) {
  if (searchParameters) {
    const queryList = Object.entries(searchParameters).map(([param, value]) => {
      const paramQuery = value !== undefined ? `${param}=${value}` : "";
      return paramQuery;
    });

    const queryString = queryList
      .filter((query) => query.trim() !== "")
      .join("&");
    return queryString.trim() !== "" ? `?${queryString}` : "";
  }
  return "";
}
