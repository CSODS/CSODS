import { ReactNode } from "react";
import { IAllProjectTags, IProjectDetails, IUser } from "@/types";
import { ProjectContextProvider, TagsContextProvider, UserContextProvider } from "@/components/shared/Providers";

interface ProjectDetailsProvidersProps {
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
        <div>
            <ProjectContextProvider projectDetails={project}>
                <TagsContextProvider allTags={allTags}>
                    <UserContextProvider user={user}>
                        {children}
                    </UserContextProvider>
                </TagsContextProvider>
            </ProjectContextProvider>
        </div>
    );
}