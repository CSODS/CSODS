export type IProjectsPage = {
  totalPages: number;
  projects: IProjectDetails[];
};

export type IProjectDetails = {
  project: IProject;
  projectFrameworks: IProjectFramework[];
};

export type IProject = {
  projectId: number;
  projectNumber: string;
  userId: number;
  projectTitle: string;
  devTypeId: number;
  primaryLanguageId: number;
  secondaryLanguageId: number | null;
  databaseTechnologyId: number | null;
  applicationIndustryId: number | null;
  gitHubUrl: string;
};

export type IAllProjectTags = {
  devTypes: IDevType[];
  programmingLanguages: IProgrammingLanguage[];
  frameworks: IFramework[];
  databaseTechnologies: IDatabaseTechnology[];
  applicationIndustries: IApplicationIndustry[];
};

export type IDevType = {
  devTypeId: number;
  devTypeName: string;
};
export type IProgrammingLanguage = {
  languageId: number;
  languageName: string;
};
export type IFramework = {
  frameworkId: number;
  frameworkName: string;
  devTypeId: number;
};
export type IProjectFramework = {
  projectId: number;
  frameworkId: number;
};
export type IDatabaseTechnology = {
  databaseId: number;
  database: string;
};
export type IApplicationIndustry = {
  industryId: number;
  industry: string;
};

export type IProjectOwner = {
  name: string;
  email: string;
};
