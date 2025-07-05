import { useEffect, useState } from "react";
import { usePageNumber, useProjectId } from "@/hooks";
import { IAllProjectTags, IProjectDetails, IProjectsPage } from "@/types";
import { ApiHandler } from "@/utils";

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

export function useFetchProject() {
    const pageNumber = usePageNumber();
    const projectId = useProjectId();
    const [project, setProject] = useState<IProjectDetails>();

    useEffect(() => {
        const loadProject = async() => {
            const apiHandler = new ApiHandler();
            const loadedProject = await apiHandler.GetProject(pageNumber, projectId);

            if (loadedProject) {
                setProject(loadedProject);
            }
        }
        loadProject();
    }, [pageNumber, projectId]);

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