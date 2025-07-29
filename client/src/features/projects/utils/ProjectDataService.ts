import {
  IProject,
  IProjectDetails,
  IProjectFramework,
  IAllProjectTags,
} from "../types";

export type IProjectTags = {
  DevType: string;
  PrimaryLanguage: string;
  SecondaryLanguage: string | null;
  DatabaseTechnology: string | null;
  ApplicationIndustry: string | null;
  Frameworks: (string | null)[];
};

export class ProjectDataService {
  private _allProjectTags: IAllProjectTags;

  public constructor(projectTags: IAllProjectTags) {
    this._allProjectTags = projectTags;
  }

  public getDevType(devTypeId: number): string {
    return (
      this._allProjectTags.DevTypes.find((dt) => dt.DevTypeId === devTypeId)
        ?.DevTypeName ?? ""
    );
  }

  public getProgrammingLanguage(languageId: number | null): string | null {
    return (
      this._allProjectTags.ProgrammingLanguages.find(
        (pl) => pl.LanguageId === languageId
      )?.LanguageName ?? null
    );
  }

  public getFramework(frameworkId: number | null): string | null {
    return (
      this._allProjectTags.Frameworks.find((f) => f.FrameworkId === frameworkId)
        ?.FrameworkName ?? null
    );
  }

  public getDatabaseTechnology(databaseId: number | null): string | null {
    return (
      this._allProjectTags.DatabaseTechnologies.find(
        (dt) => dt.DatabaseId === databaseId
      )?.Database ?? null
    );
  }

  public getApplicationIndustry(industryId: number | null): string | null {
    return (
      this._allProjectTags.ApplicationIndustries.find(
        (ai) => ai.IndustryId === industryId
      )?.Industry ?? null
    );
  }

  public omitProjectDescription(description: string): string {
    return description.length > 190
      ? description.slice(0, 190) + "..."
      : description;
  }

  public getProjectTagValues(projectDetails: IProjectDetails): IProjectTags {
    const project: IProject = projectDetails.Project;
    const frameworks: IProjectFramework[] = projectDetails.ProjectFrameworks;
    return {
      DevType: this.getDevType(project.DevTypeId),
      PrimaryLanguage: this.getProgrammingLanguage(project.PrimaryLanguageId)!,
      SecondaryLanguage: this.getProgrammingLanguage(
        project.SecondaryLanguageId
      ),
      DatabaseTechnology: this.getDatabaseTechnology(
        project.DatabaseTechnologyId
      ),
      ApplicationIndustry: this.getApplicationIndustry(
        project.ApplicationIndustryId
      ),
      Frameworks: frameworks.map((value) =>
        this.getFramework(value.FrameworkId)
      ),
    };
  }

  public getProjectTagList(tags: IProjectTags): string[] {
    const tagValues = Object.values(tags);

    const tagList: string[] = tagValues.flatMap((tag) => {
      if (typeof tag === "string") {
        return tag;
      }
      if (Array.isArray(tag)) {
        return tag.filter(
          (subTag): subTag is string => typeof subTag === "string"
        );
      }
      return [];
    });

    return tagList;
  }
}
