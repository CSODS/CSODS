import { createContext, ReactNode } from "react";
import { IAllProjectTags, IProjectDetails, IUser } from "@/types";
import { TAGS, DEFAULT_PROJECT, DEFAULT_USER } from "@/constants/defaults";

export const ProjectContext = createContext<IProjectDetails>(DEFAULT_PROJECT);

interface ProjectProviderProps {
    children: ReactNode;
    projectDetails: IProjectDetails;
}

export function ProjectContextProvider ({ children, projectDetails }: ProjectProviderProps) {
    return (
        <ProjectContext.Provider value={projectDetails}> {children} </ProjectContext.Provider>
    );
}

interface TagProviderProps {
    children: ReactNode;
    allTags: IAllProjectTags;
}

export const AllTagsContext = createContext<IAllProjectTags>(TAGS);

export function TagsContextProvider ({ children, allTags }: TagProviderProps) {
    return (
        <AllTagsContext.Provider value={allTags}> {children} </AllTagsContext.Provider>
    );
}

interface UserProviderProps {
    children: ReactNode;
    user: IUser;
}

export const UserContext = createContext<IUser>(DEFAULT_USER);

export function UserContextProvider ({ children, user }: UserProviderProps) {
    return (
        <UserContext.Provider value={user}> {children} </UserContext.Provider>
    );
}