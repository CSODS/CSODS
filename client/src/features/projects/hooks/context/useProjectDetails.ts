import { useContext } from "react";
import { ProjectDetailsContext } from "@features/projects/providers";

export function useProjectDetails() {
  const projectDetailsContext = useContext(ProjectDetailsContext);
  if (!projectDetailsContext) {
    const errMsg =
      "Function useProjectDetails must be used inside a ProjectDetailsProvider component.";
    throw new Error(errMsg);
  }
  return projectDetailsContext;
}
