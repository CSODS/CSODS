import { ReactNode } from "react";
import {
  IAllProjectTags,
  IProjectDetails,
  IProjectOwner,
} from "@features/projects/types";
import {
  ProjectDataServiceProvider,
  ProjectDetailsProvider,
  TagCategoryProvider,
  ProjectOwnerProvider,
} from "@features/projects/providers";

interface ProjectInformationProviderProps {
  children: ReactNode;
  allTags: IAllProjectTags;
  project: IProjectDetails;
  user: IProjectOwner;
}

export function ProjectInformationProvider({
  children,
  allTags,
  project,
  user,
}: ProjectInformationProviderProps) {
  return (
    <div>
      <ProjectDetailsProvider projectDetails={project}>
        <ProjectDataServiceProvider allTags={allTags}>
          <TagCategoryProvider allTags={allTags}>
            <ProjectOwnerProvider user={user}>{children}</ProjectOwnerProvider>
          </TagCategoryProvider>
        </ProjectDataServiceProvider>
      </ProjectDetailsProvider>
    </div>
  );
}
