import { createContext, ReactNode, useMemo } from "react";
import { IAllProjectTags, IProjectDetails, IUser } from "@/types";
import { TAGS, DEFAULT_PROJECT, DEFAULT_USER, PROJECT_LIST } from "@/constants/defaults";
import { ProjectDataService } from "@/utils";


interface ProjectListProviderProps {
    children: ReactNode;
    projectList: IProjectDetails[];
}

export const ProjectListContext = createContext<IProjectDetails[]>(PROJECT_LIST);

export function ProjectListProvider ({ children, projectList }: ProjectListProviderProps) {
    return <ProjectListContext.Provider value={projectList}> {children} </ProjectListContext.Provider>
}

interface ProjectDetailsProviderProps {
    children: ReactNode;
    projectDetails: IProjectDetails;
}

export const ProjectDetailsContext = createContext<IProjectDetails>(DEFAULT_PROJECT);

export function ProjectDetailsProvider ({ children, projectDetails }: ProjectDetailsProviderProps) {
    return (
        <ProjectDetailsContext.Provider value={projectDetails}> {children} </ProjectDetailsContext.Provider>
    );
}

interface ProjectDataServiceProviderProps {
    children: ReactNode;
    allTags: IAllProjectTags;
}

export const ProjectDataServiceContext = createContext<ProjectDataService | null>(null);

export function ProjectDataServiceProvider ({
    children, 
    allTags 
}: ProjectDataServiceProviderProps) {
    const service = useMemo(
        () => new ProjectDataService(allTags),
        [allTags]
    );

    return <ProjectDataServiceContext.Provider value={service}> {children} </ProjectDataServiceContext.Provider>
}

interface AllTagsProviderProps {
    children: ReactNode;
    allTags: IAllProjectTags;
}

export const AllTagsContext = createContext<IAllProjectTags | null>(null);

export function AllTagsProvider ({ children, allTags }: AllTagsProviderProps) {
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