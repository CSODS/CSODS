import {
  ProjectDetailsProvider,
  ProjectDataServiceProvider,
} from "@/components";
import { useAllTags, useFetchProjectsPage } from "@/hooks";
import { TagColorProvider, TotalPagesProvider } from "../Provider";
import ProjectCard from "./ProjectCard";
import Paginator from "./Paginator";

export function ProjectList() {
  const projectsPage = useFetchProjectsPage();
  const allTags = useAllTags();

  if (projectsPage && allTags) {
    const projectList = projectsPage.Projects;
    const totalPages = projectsPage.TotalPages;

    return (
      <div className="container-fluid p-0">
        <div className="mx-0 mt-md-5 mt-3 px-lg-3 px-sm-1 px-3 row row-cols-1 row-cols-sm-2 row-gap-lg-4 row-gap-2 d-flex justify-content-center">
          <TagColorProvider allTags={allTags}>
            <ProjectDataServiceProvider allTags={allTags}>
              {projectList.map((project, index) => {
                const cardKey = `project-card-${index}`;
                return (
                  <div
                    key={cardKey}
                    className="col px-lg-3 px-1"
                    style={{ maxWidth: 700 }}
                  >
                    <ProjectDetailsProvider projectDetails={project}>
                      <ProjectCard />
                    </ProjectDetailsProvider>
                  </div>
                );
              })}
            </ProjectDataServiceProvider>
          </TagColorProvider>
        </div>
        <div className="row m-0">
          <TotalPagesProvider totalPages={totalPages}>
            <Paginator />
          </TotalPagesProvider>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
