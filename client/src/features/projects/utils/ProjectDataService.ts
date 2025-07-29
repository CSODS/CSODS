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
      this._allProjectTags.devTypes.find((dt) => dt.devTypeId === devTypeId)
        ?.devTypeName ?? ""
    );
  }

  public getProgrammingLanguage(languageId: number | null): string | null {
    return (
      this._allProjectTags.programmingLanguages.find(
        (pl) => pl.languageId === languageId
      )?.languageName ?? null
    );
  }

  public getFramework(frameworkId: number | null): string | null {
    return (
      this._allProjectTags.frameworks.find((f) => f.frameworkId === frameworkId)
        ?.frameworkName ?? null
    );
  }

  public getDatabaseTechnology(databaseId: number | null): string | null {
    return (
      this._allProjectTags.databaseTechnologies.find(
        (dt) => dt.databaseId === databaseId
      )?.database ?? null
    );
  }

  public getApplicationIndustry(industryId: number | null): string | null {
    return (
      this._allProjectTags.applicationIndustries.find(
        (ai) => ai.industryId === industryId
      )?.industry ?? null
    );
  }

  public omitProjectDescription(description: string): string {
    return description.length > 190
      ? description.slice(0, 190) + "..."
      : description;
  }

  public getProjectTagValues(projectDetails: IProjectDetails): IProjectTags {
    const project: IProject = projectDetails.project;
    const frameworks: IProjectFramework[] = projectDetails.projectFrameworks;
    return {
      DevType: this.getDevType(project.devTypeId),
      PrimaryLanguage: this.getProgrammingLanguage(project.primaryLanguageId)!,
      SecondaryLanguage: this.getProgrammingLanguage(
        project.secondaryLanguageId
      ),
      DatabaseTechnology: this.getDatabaseTechnology(
        project.databaseTechnologyId
      ),
      ApplicationIndustry: this.getApplicationIndustry(
        project.applicationIndustryId
      ),
      Frameworks: frameworks.map((value) =>
        this.getFramework(value.frameworkId)
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
