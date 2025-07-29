export type IProjectsPage = {
  TotalPages: number;
  Projects: IProjectDetails[];
};

export type IProjectDetails = {
  Project: IProject;
  ProjectFrameworks: IProjectFramework[];
};

export type IProject = {
  ProjectId: number;
  ProjectNumber: string;
  UserId: number;
  ProjectTitle: string;
  DevTypeId: number;
  PrimaryLanguageId: number;
  SecondaryLanguageId: number | null;
  DatabaseTechnologyId: number | null;
  ApplicationIndustryId: number | null;
  GitHubUrl: string;
};

export type IAllProjectTags = {
  DevTypes: IDevType[];
  ProgrammingLanguages: IProgrammingLanguage[];
  Frameworks: IFramework[];
  DatabaseTechnologies: IDatabaseTechnology[];
  ApplicationIndustries: IApplicationIndustry[];
};

export type IDevType = {
  DevTypeId: number;
  DevTypeName: string;
};
export type IProgrammingLanguage = {
  LanguageId: number;
  LanguageName: string;
};
export type IFramework = {
  FrameworkId: number;
  FrameworkName: string;
  DevTypeId: number;
};
export type IProjectFramework = {
  ProjectId: number;
  FrameworkId: number;
};
export type IDatabaseTechnology = {
  DatabaseId: number;
  Database: string;
};
export type IApplicationIndustry = {
  IndustryId: number;
  Industry: string;
};

export type IProjectOwner = {
  Name: string;
  Email: string;
};
