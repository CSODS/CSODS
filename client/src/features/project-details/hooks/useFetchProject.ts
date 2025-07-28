import { useEffect, useState } from "react";
import { usePageNumber, useProjectId, useProjectSearchParams } from "@/hooks";
import { IAllProjectTags, IProjectDetails } from "@/types";
import { requestProject } from "../requestProject";

export function useFetchProject() {
  const pageNumber = usePageNumber();
  const projectId = useProjectId();
  const projectSearchParams = useProjectSearchParams();
  const [project, setProject] = useState<IProjectDetails | null>();

  useEffect(() => {
    const loadProject = async () => {
      const loadedProject = await requestProject(
        pageNumber,
        projectId,
        projectSearchParams
      );

      setProject(loadedProject);
    };
    loadProject();
  }, [pageNumber, projectId, projectSearchParams]);

  return project;
}
