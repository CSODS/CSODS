import { useMemo } from "react";
import { useProjectDataService } from "@/hooks";
import { useProjectTags } from "./useProjectTags";

export function useProjectTagList() {
  const projectDataService = useProjectDataService();
  const projectTags = useProjectTags();
  const projectTagList = useMemo(() => {
    return projectDataService.getProjectTagList(projectTags);
  }, [projectDataService, projectTags]);

  return projectTagList;
}
