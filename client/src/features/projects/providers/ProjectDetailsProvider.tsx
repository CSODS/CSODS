import { createContext, ReactNode } from "react";
import { IProjectDetails } from "../types";

type ProjectDetailsProviderProps = {
  children: ReactNode;
  projectDetails: IProjectDetails;
};

export const ProjectDetailsContext = createContext<IProjectDetails | null>(
  null
);

export function ProjectDetailsProvider({
  children,
  projectDetails,
}: ProjectDetailsProviderProps) {
  return (
    <ProjectDetailsContext.Provider value={projectDetails}>
      {children}
    </ProjectDetailsContext.Provider>
  );
}
