import { createContext, ReactNode, useMemo } from "react";
import { IAllProjectTags, IProjectDetails, IUser } from "@/types";
import { DEFAULT_PROJECT, DEFAULT_USER, PROJECT_LIST } from "@/constants/defaults";
import { ProjectDataService } from "@/utils";
import { PROJECT_QUERY_PARAMETERS } from "@/constants";


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

interface TagCategoryProviderProps {
    children: ReactNode;
    allTags: IAllProjectTags;
}

type tagMap = Map<string, tagDetails>;

interface tagDetails {
    tagCategory: string;
    tagId: number;
}

export const TagCategoryContext = createContext<tagMap | undefined>(undefined);

export function TagCategoryProvider({ children, allTags }: TagCategoryProviderProps) {
    const tagCategoryMap = useMemo(() => {
        const map:tagMap = new Map();

        allTags.DevTypes.forEach((dt) => { map.set(dt.DevTypeName, { tagCategory: PROJECT_QUERY_PARAMETERS.DEVELOPMENT_TYPE, tagId: dt.DevTypeId})});
        allTags.ProgrammingLanguages.forEach((pl) => { map.set(pl.LanguageName, { tagCategory: PROJECT_QUERY_PARAMETERS.PROGRAMMING_LANGUAGE, tagId: pl.LanguageId})});
        allTags.DatabaseTechnologies.forEach((db) => { map.set(db.Database, { tagCategory: PROJECT_QUERY_PARAMETERS.DATABASE_TECHNOLOGY, tagId: db.DatabaseId})});
        allTags.ApplicationIndustries.forEach((ai) => { map.set(ai.Industry, { tagCategory: PROJECT_QUERY_PARAMETERS.APPLICATION_INDUSTRY, tagId: ai.IndustryId})});
        //  TODO: ADD FRAMEWORKS TO THE TAG CATEGORIES WHEN THE BACK-END SUPPORTS IT.

        return map;
    }, [allTags])

    return (
        <TagCategoryContext.Provider value={tagCategoryMap}>
            {children}
        </TagCategoryContext.Provider>
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