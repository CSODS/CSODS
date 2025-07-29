import { useProjectDataService, useProjectDetails } from "@/hooks";
import { useMemo } from "react";

export function useProjectTags() {
  const project = useProjectDetails();
  const projectDataService = useProjectDataService();
  const projectTags = useMemo(() => {
    return projectDataService.getProjectTagValues(project);
  }, [project, projectDataService]);

  return projectTags;
}
