import { ReactNode } from "react";
import { IAllProjectTags, IProjectDetails, IUser } from "@/types";
import { ProjectDataServiceProvider, ProjectDetailsProvider, TagCategoryProvider, UserContextProvider } from "@/components";

interface ProjectInformationProviderProps {
    children: ReactNode;
    allTags: IAllProjectTags;
    project: IProjectDetails;
    user: IUser;
};

export default function ProjectInformationProvider({
    children,
    allTags,
    project,
    user
}: ProjectInformationProviderProps) {
    return (
        <div>
            <ProjectDetailsProvider projectDetails={project}>
                <ProjectDataServiceProvider allTags={allTags}>
                    <TagCategoryProvider allTags={allTags}>
                        <UserContextProvider user={user}>
                            {children}
                        </UserContextProvider>
                    </TagCategoryProvider>
                </ProjectDataServiceProvider>
            </ProjectDetailsProvider>
        </div>
    );
}