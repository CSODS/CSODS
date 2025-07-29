import { createContext, ReactNode } from "react";
import { IProjectsPage } from "@features/projects/types";

export const ProjectsPageContext = createContext<IProjectsPage | null>(null);

type ProjectsPageProviderProps = {
  children: ReactNode;
  projectsPage: IProjectsPage;
};

export default function ProjectsPageProvider({
  children,
  projectsPage,
}: ProjectsPageProviderProps) {
  return (
    <ProjectsPageContext.Provider value={projectsPage}>
      {children}
    </ProjectsPageContext.Provider>
  );
}
