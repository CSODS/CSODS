import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { PROJECT } from "@features/projects/constants";
import { IProjectSearchParameters } from "@features/projects/types";

export function useProjectSearchParams() {
  const [searchParameters] = useSearchParams();
  const projectSearchParameters = useMemo(() => {
    const { PROJECT_QUERY_PARAMETERS } = PROJECT;

    const projectSearchParameters: IProjectSearchParameters = {};
    Object.values(PROJECT_QUERY_PARAMETERS).forEach((paramName) => {
      const paramValue = searchParameters.get(paramName);
      if (paramValue) {
        projectSearchParameters[paramName] = paramValue;
      }
    });
    return projectSearchParameters;
  }, [searchParameters]);

  return projectSearchParameters;
}
