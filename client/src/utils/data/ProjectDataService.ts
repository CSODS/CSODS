import { IProject, IProjectDetails, IProjectFramework, IAllProjectTags, IProjectTags } from "../../viewModels/csods/csodsApiInterfaces";

export class ProjectDataService {
    private _allProjectTags: IAllProjectTags;

    public constructor(projectTags: IAllProjectTags) {
        this._allProjectTags = projectTags;
        console.log(this._allProjectTags);
    }

    public getDevType(devTypeId: number) : string {
        return this._allProjectTags
            .DevTypes
            .find(dt => dt.DevTypeId === devTypeId)
            ?.DevTypeName
        ?? '';
    }

    public getProgrammingLanguage(languageId: number | null) : string | null {
        return this._allProjectTags
            .ProgrammingLanguages
            .find(pl => pl.LanguageId === languageId)
            ?.LanguageName
        ?? null;
    }

    public getFramework(frameworkId: number | null) : string | null{
        return this._allProjectTags
            .Frameworks
            .find(f => f.FrameworkId === frameworkId)
            ?.FrameworkName
        ?? null;
    }

    public getDatabaseTechnology(databaseId: number | null) : string | null{
        return this._allProjectTags
            .DatabaseTechnologies
            .find(dt => dt.DatabaseId === databaseId)
            ?.Database
        ?? null;
    }

    public getApplicationIndustry(industryId: number | null) : string | null{
        return this._allProjectTags
            .ApplicationIndustries
            .find(ai => ai.IndustryId === industryId)
            ?.Industry
        ?? null;
    }

    public omitProjectDescription(description: string) : string {
        return description.length > 190
            ? description.slice(0, 190) + "..." 
            : description;
    }

    public getProjectTagValues(projectDetails: IProjectDetails) : IProjectTags {
        const project: IProject = projectDetails.Project;
        const frameworks: IProjectFramework[] = projectDetails.ProjectFrameworks;
        console.log(this._allProjectTags);
        console.log(`ID: ${project.DevTypeId}, DEVTYPE: ${this.getDevType(project.DevTypeId)}`);
        return {
            DevType: this.getDevType(project.DevTypeId),
            PrimaryLanguage: this.getProgrammingLanguage(project.PrimaryLanguageId)!,
            SecondaryLanguage: null,
            DatabaseTechnology: this.getDatabaseTechnology(project.DatabaseTechnologyId),
            ApplicationIndustry: null,
            Frameworks: frameworks.map((value) => this.getFramework(value.FrameworkId))
        }
    }
}