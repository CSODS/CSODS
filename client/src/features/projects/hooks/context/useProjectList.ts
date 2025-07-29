import { useContext } from "react";
import { ProjectListContext } from "@features/projects/providers";

export function useProjectList() {
  const projectListContext = useContext(ProjectListContext);
  if (!projectListContext) {
    const errMsg =
      "Function useProjectList must be used inside a ProjectListProvider component.";
    throw new Error(errMsg);
  }
  return projectListContext;
}
