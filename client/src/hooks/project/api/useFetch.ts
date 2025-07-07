import { useEffect, useState } from "react";
import { usePageNumber, useProjectId, useProjectSearchParams } from "@/hooks";
import { IAllProjectTags, IProjectDetails, IProjectsPage } from "@/types";
import { ApiHandler } from "@/utils";

export function useFetchProjectsPage() {
    const pageNumber = usePageNumber();
    const projectSearchParams = useProjectSearchParams();
    const [projectsPage, setProjectsPage] = useState<IProjectsPage | null>();
    useEffect(() => {
        const loadProjectPage = async () => {
            const apiHandler = new ApiHandler();
            const loadedPage = await apiHandler.GetProjectsPage(pageNumber, projectSearchParams);
            
            setProjectsPage(loadedPage);
        }
        loadProjectPage();
    }, [pageNumber, projectSearchParams]);

    return projectsPage;
}

export function useFetchProject() {
    const pageNumber = usePageNumber();
    const projectId = useProjectId();
    const projectSearchParams = useProjectSearchParams();
    const [project, setProject] = useState<IProjectDetails | null>();

    useEffect(() => {
        const loadProject = async() => {
            const apiHandler = new ApiHandler();
            const loadedProject = await apiHandler.GetProject(pageNumber, projectId, projectSearchParams);

            setProject(loadedProject);
        }
        loadProject();
    }, [pageNumber, projectId, projectSearchParams]);

    return project;
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