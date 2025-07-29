import { useContext } from "react";
import { ProjectDataServiceContext } from "@features/projects/providers";

export function useProjectDataService() {
  const projectDataServiceContext = useContext(ProjectDataServiceContext);
  if (!projectDataServiceContext) {
    const errMsg =
      "Function useProjectDataService must be used inside a ProjectDataServiceProvider component.";
    throw new Error(errMsg);
  }
  return projectDataServiceContext;
}
