export interface IProjectsPage {
    VisitCount: number,
    Projects: IProjectDetails[]
};

export interface IProjectDetails {
    Project: IProject,
    ProjectFrameworks: IProjectFramework[]
};

export interface IAllProjectTags {
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

