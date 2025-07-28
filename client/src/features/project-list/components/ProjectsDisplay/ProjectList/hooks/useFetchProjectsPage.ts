import { useEffect, useState } from "react";
import { usePageNumber, useProjectSearchParams } from "@/hooks";
import { IProjectsPage } from "@/types";
import { requestProjectsPage } from "../requestProjectsPage";

export function useFetchProjectsPage() {
  const pageNumber = usePageNumber();
  const projectSearchParams = useProjectSearchParams();
  const [projectsPage, setProjectsPage] = useState<IProjectsPage | null>(null);
  useEffect(() => {
    const loadProjectPage = async () => {
      const loadedPage = await requestProjectsPage(
        pageNumber,
        projectSearchParams
      );

      setProjectsPage(loadedPage);
    };
    loadProjectPage();
  }, [pageNumber, projectSearchParams]);

  return projectsPage;
}
