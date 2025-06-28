import axios from "axios";
import * as CONSTANTS from "../../constants/constants";
import { IAllProjectTags, IProjectDetails } from "../../viewModels/csods/csodsApiInterfaces";

export default class ApiHandler {
    public async GetProjectList(pageNumber: string): Promise<IProjectDetails[] | null> {
        const projectPageLink = `${CONSTANTS.CSODS_BASE}${CONSTANTS.API_PATHS.PROJECTS}/${pageNumber}`;
        
        try {
            const response = await axios.get(projectPageLink);
            return response.data.Projects;
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