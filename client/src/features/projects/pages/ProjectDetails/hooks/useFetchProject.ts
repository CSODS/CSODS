import { useEffect, useState } from "react";
import { AuthHooks } from "@/core/auth";
import {
  usePageNumber,
  useProjectId,
  useProjectSearchParams,
} from "@features/projects/hooks";
import { IProjectDetails } from "@features/projects/types";
import { requestProject } from "../requestProject";

export function useFetchProject() {
  const securedAxios = AuthHooks.useSecuredAxios();
  const pageNumber = usePageNumber();
  const projectId = useProjectId();
  const projectSearchParams = useProjectSearchParams();
  const [project, setProject] = useState<IProjectDetails | null>();

  useEffect(() => {
    const loadProject = async () => {
      const loadedProject = await requestProject(
        securedAxios,
        pageNumber,
        projectId,
        projectSearchParams
      );

      setProject(loadedProject);
    };
    loadProject();
  }, [pageNumber, projectId, projectSearchParams, securedAxios]);

  return project;
}
