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
    let isMounted = true;
    const controller = new AbortController();

    const loadProject = async () => {
      const loadedProject = await requestProject(
        securedAxios,
        controller.signal,
        pageNumber,
        projectId,
        projectSearchParams
      );

      isMounted && setProject(loadedProject);
    };
    loadProject();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [pageNumber, projectId, projectSearchParams, securedAxios]);

  return project;
}
