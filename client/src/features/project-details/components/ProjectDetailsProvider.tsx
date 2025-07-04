import { ReactNode, createContext } from "react";
import { IAllProjectTags, IProjectDetails, IUser } from "@/types";
import { DEFAULTS } from "@constants/index";

const TAGS = DEFAULTS.TAGS;
const DEFAULT_PROJECT = DEFAULTS.DEFAULT_PROJECT;
const DEFAULT_USER = DEFAULTS.DEFAULT_USER;

export const AllTagsContext = createContext<IAllProjectTags>(TAGS);
export const ProjectContext = createContext<IProjectDetails>(DEFAULT_PROJECT);
export const UserContext = createContext<IUser>(DEFAULT_USER);

export interface ProjectDetailsProvidersProps {
    children: ReactNode;
    allTags: IAllProjectTags;
    project: IProjectDetails;
    user: IUser;
};

export default function ProjectDetailsProvider({
    children,
    allTags,
    project,
    user
}: ProjectDetailsProvidersProps) {
    return (
        <ProjectContext.Provider value={project}>
            <AllTagsContext.Provider value={allTags}>
                <UserContext.Provider value={user}>
                    {children}
                </UserContext.Provider>
            </AllTagsContext.Provider>
        </ProjectContext.Provider>
    );
}