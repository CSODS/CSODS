import { ReactNode, createContext } from "react";
import { IAllProjectTags, IProjectDetails, IUser } from "@/types";
import { DEFAULT_PROJECT, TAGS, DEFAULT_USER } from "../../../constants/defaults";


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