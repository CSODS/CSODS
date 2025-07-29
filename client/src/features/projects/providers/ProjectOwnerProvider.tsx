import { createContext, ReactNode } from "react";
import { IProjectOwner } from "../types";

type ProjectOwnerProviderProps = {
  children: ReactNode;
  user: IProjectOwner;
};

export const ProjectOwnerContext = createContext<IProjectOwner | null>(null);

export function ProjectOwnerProvider({
  children,
  user,
}: ProjectOwnerProviderProps) {
  return (
    <ProjectOwnerContext.Provider value={user}>
      {children}
    </ProjectOwnerContext.Provider>
  );
}
