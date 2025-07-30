import { useEffect, useState } from "react";
import {
  usePageNumber,
  useProjectSearchParams,
} from "@features/projects/hooks";
import { IProjectsPage } from "@features/projects/types";
import { requestProjectsPage } from "../requestProjectsPage";

export function useFetchProjectsPage() {
  const pageNumber = usePageNumber();
  const projectSearchParams = useProjectSearchParams();
  const [projectsPage, setProjectsPage] = useState<IProjectsPage | null>(null);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadProjectPage = async () => {
      const loadedPage = await requestProjectsPage(
        controller.signal,
        pageNumber,
        projectSearchParams
      );
      isMounted && setProjectsPage(loadedPage);
    };
    loadProjectPage();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [pageNumber, projectSearchParams]);

  return projectsPage;
}
