import axios from "axios";
import { CSODS_API_PATHS } from "@/constants";
import { IAllProjectTags, IProjectDetails, IProjectSearchParameters, IProjectsPage } from "@/types";
import { assembleQuery } from "../navigation/navigation";

export default class ApiHandler {
    private readonly _apiBase = CSODS_API_PATHS.BASE;

    public async GetProjectsPage(pageNumber: string | number, searchParameters?: IProjectSearchParameters): Promise<IProjectsPage | null> {
        const projectsPath = `${CSODS_API_PATHS.PROJECTS.PATH}/${pageNumber}`;
        const query = assembleQuery(searchParameters);
        const endpoint = `${this._apiBase}${projectsPath}${query}`;
        try {
            const response = await axios.get(endpoint);
            const projects = response.data.Projects;
            const totalPages = response.data.TotalPages;
            const projectsPage: IProjectsPage = {
                TotalPages: totalPages,
                Projects: projects
            };
            return projectsPage;
        }
        catch (err) {
            console.error('Failed to fetch project list: ', err);
            return null;
        }
    }

    public async GetProject(pageNumber: string | number, projectId: string | number, searchParameters?: IProjectSearchParameters): Promise<IProjectDetails | null> {
        const query = assembleQuery(searchParameters);
        const endpoint = `${this._apiBase}${CSODS_API_PATHS.PROJECTS.PATH}/${pageNumber}/${projectId}${query}`;
        
        try {
            const response = await axios.get(endpoint);
            const project = response.data;
            return project;
        }
        catch (err) {
            console.error('Failed to fetch project: ', err);
            return null;
        }
    }

    public async GetAllTags(): Promise<IAllProjectTags | null> {
        const projectTagsPath = CSODS_API_PATHS.PROJECT_TAGS.PATH;
        const all_data = CSODS_API_PATHS.PROJECT_TAGS.ALL_DATA;
        const projectTagsLink = `${this._apiBase}${projectTagsPath}${all_data}`;

        try {
            const response = await axios.get(projectTagsLink);
            return response.data;
        }
        catch (err) {
            console.error(`Failed to fetch tag data: ${err}`);
            return null;
        }
    }
}