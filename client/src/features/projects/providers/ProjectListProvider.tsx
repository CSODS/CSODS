import { createContext, ReactNode } from "react";
import { IProjectDetails } from "../types";

type ProjectListProviderProps = {
  children: ReactNode;
  projectList: IProjectDetails[];
};

export const ProjectListContext = createContext<IProjectDetails[]>(
  [] as IProjectDetails[]
);

export function ProjectListProvider({
  children,
  projectList,
}: ProjectListProviderProps) {
  return (
    <ProjectListContext.Provider value={projectList}>
      {" "}
      {children}{" "}
    </ProjectListContext.Provider>
  );
}
