import { IProjectFramework } from "./tags/projectTags"

export interface IProjectDetails {
    Project: IProject,
    ProjectFrameworks: IProjectFramework[]
};

export interface IProject {
    ProjectId: number,
    ProjectNumber: string,
    UserId: number,
    ProjectTitle: string,
    DevTypeId: number,
    PrimaryLanguageId: number,
    SecondaryLanguageId: number | null,
    DatabaseTechnologyId: number | null,
    ApplicationIndustryId: number | null,
    GitHubUrl: string
};