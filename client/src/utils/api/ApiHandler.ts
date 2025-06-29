import axios from "axios";
import * as CONSTANTS from "../../constants/constants";
import { IAllProjectTags, IProjectsPage } from "../../viewModels/csods/csodsApiInterfaces";

export default class ApiHandler {
    public async GetProjectsPage(pageNumber: string): Promise<IProjectsPage | null> {
        const projectPageLink = `${CONSTANTS.CSODS_BASE}${CONSTANTS.API_PATHS.PROJECTS}/${pageNumber}`;
        
        try {
            const response = await axios.get(projectPageLink);
            const projects = response.data.Projects;
            const totalPages = response.data.TotalPages;
            const projectsPage: IProjectsPage = {
                TotalPages: totalPages,
                Projects: projects
            };
            return projectsPage;
        }
        catch (err) {
            console.error(`Failed to fetch project list: ${err}`);
            return null;
        }
    }

    public async GetAllTags(): Promise<IAllProjectTags | null> {
        const projectTagsLink = `${CONSTANTS.CSODS_BASE}${CONSTANTS.API_PATHS.PROJECT_TAGS}${CONSTANTS.PROJECT_TAG_PATHS.ALL_DATA}`;

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