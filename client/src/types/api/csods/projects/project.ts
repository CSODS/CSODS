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

export interface IProjectTags {
    DevType: string,
    PrimaryLanguage: string,
    SecondaryLanguage: string | null,
    DatabaseTechnology: string | null,
    ApplicationIndustry: string | null,
    Frameworks: (string | null)[]
};