import { useFetchProjectsPage, useFetchTagData } from "@/hooks";
import { ProjectDetailsProvider, ProjectDataServiceProvider } from "@/components";
import ProjectCard from "./ProjectCards";
import Paginator from "./Paginator";

export default function ProjectList () {
    const projectsPage = useFetchProjectsPage();
    const allTags = useFetchTagData();

    if (projectsPage && allTags) {
        const projectList = projectsPage.Projects;
        const totalPages = projectsPage.TotalPages;
        
        return (
            <div className="row">
                <div className='mx-0 px-3 mt-5 row row-cols-1 row-cols-md-2 row-gap-4 d-flex justify-content-center'>
                    <ProjectDataServiceProvider allTags={allTags}>
                        {
                            projectList.map((project, index) => {
                                const contextKey = `project-context-${index}`;
                                const cardKey = `project-card-${index}`;
                                return (
                                    <ProjectDetailsProvider key={contextKey} projectDetails={project}>
                                        <ProjectCard key={cardKey}/>
                                    </ProjectDetailsProvider>
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
        return <div></div>
    }
}