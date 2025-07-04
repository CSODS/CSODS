import { useNavigate } from "react-router-dom";
import { IProjectDetails } from "@/types";
import ADDRESSES from "@constants/addresses/addresses";
import { IProjectTags } from "@utils/data/ProjectDataService";

interface ProjectCardProps {
  pageNumber: number,
  iconClass: string, 
  projectDetails: IProjectDetails,
  projectTags: IProjectTags, 
  projectDescription: string
};

export default function ProjectCard({
  pageNumber,
  iconClass,
  projectDetails,
  projectTags, 
  projectDescription
}: ProjectCardProps) {
  const redirectToUrl = (url: string) => {
    window.open(url);
    return;
  }
  
  const navigate = useNavigate();
  const viewProject = (pageNumber: number, projectId: number) => {
    const pageLink = `${ADDRESSES.STUDENT_PROJECTS.ROOT}/${pageNumber}`;
    const detailsLink = `${ADDRESSES.PROJECT_DETAILS.ROOT}/${projectId}`;
    navigate(`${pageLink}${detailsLink}`);
  }

  const projectId: number = projectDetails.Project.ProjectId;

  return (
    <div key={projectDetails.Project.ProjectId} className='col' style={{maxWidth:700}}>
      {/* project card */}
      <div className='ps-lg-2 card project-card-dark-3 translucent-40 border-light-1 rounded-4'>
        <div className='row g-0'>
          <div className='pt-3 col-lg-1'>
            <i className={`${iconClass} color-light-2 fs-4`}></i>
          </div>
          <div className='col-lg-11'>
            <div className='px-3 pb-3 ps-lg-0 card-body d-flex flex-column align-items-start text-light' style={{minHeight:290}}>
              {/* project title  */}
              <h5 className='card-title text-start fs-3 color-light-2 bolder'>{projectDetails.Project.ProjectTitle}</h5>
              {/* project description */}
              <p className='card-text my-1 text-start'>{projectDescription}</p>
              <div className='mt-auto mx-0 row col-12'>
                {/* project tags */}
                <div className='ps-0 d-flex flex-wrap align-items-start'>
                    {Tags(projectTags)}
                </div>
                {/* github link and view link */}
                <div className='mt-3 mb-0 ps-0 pe-0 d-flex flex-row align-items-center'>
                  <button type='button' className='col-lg-3 px-4 py-2 ms-0 me-3 btn btn-light-1 rounded-4 border border-1 border-dark-3' onClick={() => redirectToUrl(projectDetails.Project.GitHubUrl)}>
                      {/* <img src={github_logo} alt='...' className='img-fluid'/> */}
                      GitHub
                  </button>
                  <button type='button' className='col-lg-3 px-4 py-2 ms-0 me-3 btn btn-dark-3 rounded-4 border border-1 border-light-1' onClick={() => viewProject(pageNumber, projectId)}>View</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tags(projectTags: IProjectTags) {
  const tagValues = Object.values(projectTags);
  return(
    tagValues.map((tag, index) => {
      if (typeof tag === 'string') {
        return (
          <div key={`tag-${index}`} className='mt-1 py-1 px-3 ms-0 me-2 bg-dark-1 btn btn-dark-1 rounded-pill border border-light-1 fs-xs'>
            {tag}
          </div>
        )
      }
      else if (Array.isArray(tag)) {
        return (
          tag.map((subTag, subIndex) => 
            subTag ? (
                <div key={`tag-${subIndex}`} className='mt-1 py-1 px-3 ms-0 me-2 bg-dark-1 btn btn-dark-1 rounded-pill border border-light-1 fs-xs'>
                  {subTag}  
                </div>
            ) : null
        ))
      }
      else {
        return [];
      }
    })
  )
}