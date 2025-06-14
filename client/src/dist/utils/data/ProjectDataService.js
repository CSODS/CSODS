export class ProjectDataService {
    constructor(projectTags) {
        this._allProjectTags = projectTags;
        console.log(this._allProjectTags);
    }
    getDevType(devTypeId) {
        var _a, _b;
        return (_b = (_a = this._allProjectTags
            .DevTypes
            .find(dt => dt.DevTypeId === devTypeId)) === null || _a === void 0 ? void 0 : _a.DevTypeName) !== null && _b !== void 0 ? _b : '';
    }
    getProgrammingLanguage(languageId) {
        var _a, _b;
        return (_b = (_a = this._allProjectTags
            .ProgrammingLanguages
            .find(pl => pl.LanguageId === languageId)) === null || _a === void 0 ? void 0 : _a.LanguageName) !== null && _b !== void 0 ? _b : null;
    }
    getFramework(frameworkId) {
        var _a, _b;
        return (_b = (_a = this._allProjectTags
            .Frameworks
            .find(f => f.FrameworkId === frameworkId)) === null || _a === void 0 ? void 0 : _a.FrameworkName) !== null && _b !== void 0 ? _b : null;
    }
    getDatabaseTechnology(databaseId) {
        var _a, _b;
        return (_b = (_a = this._allProjectTags
            .DatabaseTechnologies
            .find(dt => dt.DatabaseId === databaseId)) === null || _a === void 0 ? void 0 : _a.Database) !== null && _b !== void 0 ? _b : null;
    }
    getApplicationIndustry(industryId) {
        var _a, _b;
        return (_b = (_a = this._allProjectTags
            .ApplicationIndustries
            .find(ai => ai.IndustryId === industryId)) === null || _a === void 0 ? void 0 : _a.Industry) !== null && _b !== void 0 ? _b : null;
    }
    omitProjectDescription(description) {
        return description.length > 190
            ? description.slice(0, 190) + "..."
            : description;
    }
    getProjectTagValues(projectDetails) {
        const project = projectDetails.Project;
        const frameworks = projectDetails.ProjectFrameworks;
        console.log(this._allProjectTags);
        console.log(`ID: ${project.DevTypeId}, DEVTYPE: ${this.getDevType(project.DevTypeId)}`);
        return {
            DevType: this.getDevType(project.DevTypeId),
            PrimaryLanguage: this.getProgrammingLanguage(project.PrimaryLanguageId),
            SecondaryLanguage: null,
            DatabaseTechnology: this.getDatabaseTechnology(project.DatabaseTechnologyId),
            ApplicationIndustry: null,
            Frameworks: frameworks.map((value) => this.getFramework(value.FrameworkId))
        };
    }
}
