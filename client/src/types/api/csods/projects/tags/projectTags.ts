export interface IAllProjectTags {
    DevTypes: IDevType[],
    ProgrammingLanguages: IProgrammingLanguage[],
    Frameworks: IFramework[],
    DatabaseTechnologies: IDatabaseTechnology[],
    ApplicationIndustries: IApplicationIndustry[],
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