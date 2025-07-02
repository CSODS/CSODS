import { DEFAULT_PROJECT, TAGS, DEFAULT_USER } from "../../constants/defaults";
import { useState, useEffect, createContext } from "react";
import { useParams } from "react-router-dom";
import ProjectInformationCard from "./projectDetailsComponents/ProjectInformation";
import { IAllProjectTags, IProjectDetails, IUser } from "../../viewModels/csods/csodsApiInterfaces";
import ApiHandler from "../../utils/api/ApiHandler";

export const AllTagsContext = createContext<IAllProjectTags>(TAGS);
export const ProjectContext = createContext<IProjectDetails>(DEFAULT_PROJECT);
export const UserContext = createContext<IUser>(DEFAULT_USER);

export default function ProjectDetails() {
  const { pageNumber, projectId} = useParams();

  const [allTags, setAllTags] = useState<IAllProjectTags>();
  const [project, setProject] = useState<IProjectDetails>();
  const [user] = useState<IUser>(DEFAULT_USER);

  useEffect(() => {
    const apiHandler = new ApiHandler();
    const loadTagData = async() => {
      const tagData = await await apiHandler.GetAllTags();
      if (tagData) {
        setAllTags(tagData);
      }
    }
    loadTagData();
  }, []);
  
  useEffect(() => {
    const apiHandler = new ApiHandler();
    const loadProject = async() => {
      if (pageNumber && projectId) {
        const projectData = await apiHandler.GetProject(pageNumber, projectId);
        if (projectData)
        {
          setProject(projectData);
        }
      }
    }
    loadProject();
  }, [pageNumber, projectId]);

  if (allTags && project) { 
    return (
      <AllTagsContext.Provider value={allTags}>
        <ProjectContext.Provider value={project}>
            <div className="px-lg-5 d-flex flex-column justify-content-center align-items-center">
              <div className="mt-3 row row-cols-lg-2 w-100">
                <div className="col-lg-4">
                  Core Contributors
                </div>
                <UserContext.Provider value={user}>
                  <div className="col-lg-8">
                    <ProjectInformationCard/>
                  </div>
                </UserContext.Provider>
              </div>
            </div>
        </ProjectContext.Provider>
      </AllTagsContext.Provider>
    )
  }
  else {
    return <p>no data</p>
  }
}