export interface IProjectsPage {
    VisitCount: number,
    Projects: IProjectDetails[]
};

export interface IProjectDetails {
    Project: IProject,
    ProjectFrameworks: IProjectFramework[]
};

export interface IProjectTags {
    DevTypes: IDevType[],
    ProgrammingLanguages: IProgrammingLanguage[],
    Frameworks: IFramework[],
    DatabaseTechnologies: IDatabaseTechnology[],
    ApplicationIndustries: IApplicationIndustry[],
};

export interface IProject {
    ProjectId: number,
    ProjectNumber: string,
    UserId: number,
    ProjectTitle: string,
    DevTypeId: number,
    PrimaryLanguageId: number,
    SecondaryLanguageId: number,
    DatabaseTechnologyId: number,
    ApplicationIndustryId: number,
    GitHubUrl: string
};

export interface IDevType {
    DevTypeId: number,
    DevTypeName: string
};

export interface IProgrammingLanguage {
    LanguageId: number,
    LanguageName: string
};

export interface IFramework {
    FrameworkId: number,
    FrameworkName: string,
    DevTypeId: number
};

export interface IProjectFramework {
    ProjectId: number,
    FrameworkId: number,
};

export interface IDatabaseTechnology {
    DatabaseId: number,
    Database: string
};

export interface IApplicationIndustry {
    IndustryId: number,
    Industry: string
};

