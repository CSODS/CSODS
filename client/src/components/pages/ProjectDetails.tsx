import { DEFAULT_PROJECT, TAGS, DEFAULT_USER } from "../../constants/defaults";
import { useState, useEffect, createContext } from "react";
import { useParams } from "react-router-dom";
import ProjectInformationCard from "./projectDetailsComponents/ProjectInformation";
import { IAllProjectTags, IProjectDetails, IUser } from "../../viewModels/csods/csodsApiInterfaces";
import ApiHandler from "../../utils/api/ApiHandler";
import CoreContributors from "./projectDetailsComponents/CoreContributors";
import ProjectDetailsProvider from "./projectDetailsComponents/ProjectDetailsProvider";

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
      <div className="px-lg-5 d-flex flex-column justify-content-center align-items-center">
        <ProjectDetailsProvider allTags={allTags} project={project} user={user}>
          <div className="mt-3 row row-cols-lg-2 w-100">
            <div className="col-lg-4">
              <CoreContributors/>
            </div>
            <div className="col-lg-8">
              <ProjectInformationCard/>
            </div>
          </div>
        </ProjectDetailsProvider>
      </div>
    )
  }
  else {
    return <p>no data</p>
  }
}