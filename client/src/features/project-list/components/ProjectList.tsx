import { ProjectDetailsProvider, ProjectDataServiceProvider } from "@/components";
import { useAllTags, useFetchProjectsPage } from "@/hooks";
import ProjectCard from "./ProjectCards";
import Paginator from "./Paginator";
import { TagColorProvider, TotalPagesProvider } from "./Provider";

export default function ProjectList () {
    const projectsPage = useFetchProjectsPage();
    const allTags = useAllTags();

    if (projectsPage && allTags) {
        const projectList = projectsPage.Projects;
        const totalPages = projectsPage.TotalPages;
        
        return (
            <div className="row">
                <div className='mx-0 mt-md-5 mt-3 px-3 row row-cols-1 row-cols-md-2 row-gap-4 d-flex justify-content-center'>
                    <TagColorProvider allTags={allTags}>
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
                    </TagColorProvider>
                </div>
                <div className="row">
                    <TotalPagesProvider totalPages={totalPages}>
                        <Paginator/>
                    </TotalPagesProvider>
                </div>
            </div>
        );
    }
    else {
        return <div></div>
    }
}