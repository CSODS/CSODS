import { IProjectsPage } from "@/types";
import { createContext, ReactNode } from "react";

export const ProjectsPageContext = createContext<IProjectsPage | null>(null);

type ProjectsPageProviderProps = {
  children: ReactNode;
  projectsPage: IProjectsPage;
};

export function ProjectsPageProvider({
  children,
  projectsPage,
}: ProjectsPageProviderProps) {
  return (
    <ProjectsPageContext.Provider value={projectsPage}>
      {children}
    </ProjectsPageContext.Provider>
  );
}
