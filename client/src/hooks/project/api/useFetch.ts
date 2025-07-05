import { useEffect, useState } from "react";
import { usePageNumber } from "@/hooks/params/useProjectParams";
import { IAllProjectTags, IProjectsPage } from "@/types";
import ApiHandler from "@/utils/api/ApiHandler";

export function useFetchProjectsPage() {
    const pageNumber = usePageNumber();
    const [projectsPage, setProjectsPage] = useState<IProjectsPage>();
    useEffect(() => {
        const loadProjectPage = async () => {
            const apiHandler = new ApiHandler();
            const loadedPage = await apiHandler.GetProjectsPage(pageNumber);
            
            if (loadedPage) {
                setProjectsPage(loadedPage);
            }
        }
        loadProjectPage();
    }, [pageNumber]);

    return projectsPage;
}

export function useFetchTagData() {    
    const [allTags, setAllTags] = useState<IAllProjectTags>();

    useEffect(() => {
        const apiHandler = new ApiHandler();
        const loadTagData = async() => {
          const tagData = await apiHandler.GetAllTags();
          if (tagData) {
            setAllTags(tagData);
          }
        }
        loadTagData();
    }, []);

    return allTags;
}