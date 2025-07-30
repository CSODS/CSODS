import { createContext, ReactNode, useMemo } from "react";
import { IAllProjectTags } from "../types";
import { ProjectDataService } from "../utils";

type ProjectDataServiceProviderProps = {
  children: ReactNode;
  allTags: IAllProjectTags;
};

export const ProjectDataServiceContext =
  createContext<ProjectDataService | null>(null);

export function ProjectDataServiceProvider({
  children,
  allTags,
}: ProjectDataServiceProviderProps) {
  const service = useMemo(() => new ProjectDataService(allTags), [allTags]);

  return (
    <ProjectDataServiceContext.Provider value={service}>
      {" "}
      {children}{" "}
    </ProjectDataServiceContext.Provider>
  );
}
