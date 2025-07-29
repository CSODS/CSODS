import { useEffect, useState } from "react";
import { AuthHooks } from "@/core/auth";
import {
  usePageNumber,
  useProjectSearchParams,
} from "@features/projects/hooks";
import { IProjectsPage } from "@features/projects/types";
import { requestProjectsPage } from "../requestProjectsPage";

export function useFetchProjectsPage() {
  const securedAxios = AuthHooks.useSecuredAxios();
  const pageNumber = usePageNumber();
  const projectSearchParams = useProjectSearchParams();
  const [projectsPage, setProjectsPage] = useState<IProjectsPage | null>(null);
  useEffect(() => {
    const loadProjectPage = async () => {
      const loadedPage = await requestProjectsPage(
        securedAxios,
        pageNumber,
        projectSearchParams
      );

      setProjectsPage(loadedPage);
    };
    loadProjectPage();
  }, [pageNumber, projectSearchParams, securedAxios]);

  return projectsPage;
}
