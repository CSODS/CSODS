import { ReactNode } from "react";
import { IAllProjectTags, IProjectDetails, IUser } from "@/types";
import { ProjectDataServiceProvider, ProjectDetailsProvider, UserContextProvider } from "@/components/shared/Providers";

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
                    <UserContextProvider user={user}>
                        {children}
                    </UserContextProvider>
                </ProjectDataServiceProvider>
            </ProjectDetailsProvider>
        </div>
    );
}