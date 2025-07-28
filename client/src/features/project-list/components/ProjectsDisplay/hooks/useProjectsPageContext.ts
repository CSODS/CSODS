import { useContext } from "react";
import { ProjectsPageContext } from "../ProjectsPageProvider";

export function useProjectsPage() {
  const projectsPage = useContext(ProjectsPageContext);

  if (!projectsPage) {
    const errMsg =
      "Function useProjectsPage must be used inside a ProjectsPageProvider component.";
    throw new Error(errMsg);
  }

  return projectsPage;
}
