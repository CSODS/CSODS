import { ReactNode } from "react";
import { IAllProjectTags, IProjectDetails, IUser } from "@/types";
import { ProjectDetailsProvider, TagsContextProvider, UserContextProvider } from "@/components/shared/Providers";

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
            <ProjectDetailsProvider projectDetails={project}>
                <TagsContextProvider allTags={allTags}>
                    <UserContextProvider user={user}>
                        {children}
                    </UserContextProvider>
                </TagsContextProvider>
            </ProjectDetailsProvider>
        </div>
    );
}