import {
  ProjectDetailsProvider,
  ProjectDataServiceProvider,
} from "@features/projects/providers";
import { useAllTags } from "@features/projects/hooks";
import { useProjectsPage } from "../hooks";
import ProjectCard from "./ProjectCard";
import TagColorProvider from "./TagColorProvider";

export default function ProjectList() {
  const projectsPage = useProjectsPage();
  const allTags = useAllTags();

  return (
    <div className="container-fluid p-0">
      <div className="mx-0 mt-md-5 mt-3 px-lg-3 px-sm-1 px-3 row row-cols-1 row-cols-sm-2 row-gap-lg-4 row-gap-2 d-flex justify-content-center">
        <TagColorProvider allTags={allTags}>
          <ProjectDataServiceProvider allTags={allTags}>
            {projectsPage.projects.map((project, index) => {
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
    </div>
  );
}
