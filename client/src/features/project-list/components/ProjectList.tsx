import { ProjectContextProvider, ProjectDataServiceProvider } from "@/components/shared/Providers";
import { DEFAULTS } from "@/constants";
import { IAllProjectTags, IProjectDetails } from "@/types";
import ApiHandler from "@/utils/api/ApiHandler";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProjectCard } from "./ProjectCards";
import Paginator from "./Paginator";

export function ProjectList () {
    const [projectList, setProjectList] = useState<IProjectDetails[]>(DEFAULTS.PROJECT_LIST);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [allTags, setAllTags] = useState<IAllProjectTags>(DEFAULTS.TAGS);

    const { pageNumber } = useParams();

    useEffect(() => {
        const apiHandler = new ApiHandler();
        const loadProjectList = async() => {
          if (pageNumber){
            const projectsPage = await apiHandler.GetProjectsPage(pageNumber);
            if (projectsPage && projectsPage.Projects) {
              setTotalPages(projectsPage.TotalPages);
              setProjectList(projectsPage.Projects);
            }
          }
        }
        loadProjectList();
    }, [pageNumber]);
    
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

    if (projectList) {
        return (
            <div className="row">
                <div className='mx-0 px-3 mt-5 row row-cols-1 row-cols-md-2 row-gap-4 d-flex justify-content-center'>
                    <ProjectDataServiceProvider allTags={allTags}>
                        {
                            projectList.map((project, index) => {
                                const contextKey = `project-context-${index}`;
                                const cardKey = `project-card-${index}`;
                                return (
                                    <ProjectContextProvider key={contextKey} projectDetails={project}>
                                        <ProjectCard key={cardKey}/>
                                    </ProjectContextProvider>
                                )
                            })
                        }
                    </ProjectDataServiceProvider>
                </div>
                <div className="row">
                    <Paginator totalPages={totalPages}/>
                </div>
            </div>
        );
    }
    else {
        return <div> no data </div>
    }
}