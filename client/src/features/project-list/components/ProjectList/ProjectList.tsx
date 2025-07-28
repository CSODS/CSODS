import {
  ProjectDetailsProvider,
  ProjectDataServiceProvider,
} from "@/components";
import { useAllTags } from "@/hooks";
import { useProjectsPage } from "../../hooks";
import { TagColorProvider } from "../Provider";
import ProjectCard from "./ProjectCard";

export function ProjectList() {
  const projectsPage = useProjectsPage();
  const allTags = useAllTags();

  return (
    <div className="container-fluid p-0">
      <div className="mx-0 mt-md-5 mt-3 px-lg-3 px-sm-1 px-3 row row-cols-1 row-cols-sm-2 row-gap-lg-4 row-gap-2 d-flex justify-content-center">
        <TagColorProvider allTags={allTags}>
          <ProjectDataServiceProvider allTags={allTags}>
            {projectsPage.Projects.map((project, index) => {
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
