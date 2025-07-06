import { useNavigate, useParams } from "react-router-dom";
import { BtnBare } from "@/components";
import { DEFAULTS, ICONS } from "@/constants";
import { useProjectDataService, useProjectDetails, useProjectIcon } from "@/hooks";
import { redirectToUrl } from "@/utils";
import { getProjectLink } from "../utils";
import { useTagColorMap } from "../hooks/context";
import { Color } from "@/types";

export default function ProjectCard () {
  const navigate = useNavigate();
  const viewProject = () => { navigate(getProjectLink(Number(pageNumber), projectId)) }

  const { pageNumber } = useParams();
  const projectDetails = useProjectDetails();
  const projectDataService = useProjectDataService();

  const projectTags = projectDataService.getProjectTagValues(projectDetails);
  const tagList = projectDataService.getProjectTagList(projectTags);
  const projectDescription = projectDataService.omitProjectDescription(DEFAULTS.LOREM_IPSUM);
  const iconClass = useProjectIcon(projectTags.DevType as keyof typeof ICONS);

  const projectId: number = projectDetails.Project.ProjectId;

  return (
    <div key={`projectId-${projectId}`} className="col" style={{ maxWidth:700 }}>
      {/* project card */}
      <div className='ps-lg-2 card project-card-dark-3 translucent-40 border-light-1 rounded-4'>
        <div className='row g-0 pt-1'>
          <div className='pt-3 col-lg-1'>
            <i className={`${iconClass} color-light-2 fs-4`}></i>
          </div>
          <div className='col-lg-11'>
            <div className='px-3 pb-3 ps-lg-0 card-body d-flex flex-column align-items-start text-light' style={{minHeight:260}}>
              {/* project title  */}
              <h5 className='card-title text-start fs-3 color-light-2 bolder'>{projectDetails.Project.ProjectTitle}</h5>
              {/* project description */}
              <p className='card-text my-1 text-start'>{projectDescription}</p>
              <TagRow tagList={tagList}/>
              <div className='mt-auto mx-0 row col-12'>
                {/* project tags */}
                {/* github link and view link */}
                <div className='mt-3 mb-2 ps-0 pe-0 d-flex flex-row align-items-center'>
                  <button type='button' className='col-lg-3 px-4 py-2 ms-0 me-3 btn-dark-1 hover-lighten rounded-4 border border-0' onClick={() => redirectToUrl(projectDetails.Project.GitHubUrl)}>
                      {/* <img src={github_logo} alt='...' className='img-fluid'/> */}
                      GitHub
                  </button>
                  <button type='button' className='col-lg-3 px-4 py-2 ms-0 me-3 btn-dark-1 hover-lighten rounded-4 border border-0' onClick={() => viewProject()}>View</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface TagRowProps {
    tagList: string[];
}

function TagRow({ tagList }: TagRowProps) {
  const colSelectors = ["p-0 col d-flex flex-wrap align-items-start"];

  return (
    <div className="mx-0 mt-2 row w-100">
      <div className={colSelectors.join(' ')}>
          {
            tagList.map((tag, index) => {
              return (
                <Tag tag={tag} index={index}/>
              )
            })
          }
      </div>
  </div>
  )
}

interface TagProps {
  tag: string;
  index: number;
}

function Tag({ tag, index }: TagProps) {
  const tagColorMap = useTagColorMap();
  const iconColor = tagColorMap.get(tag);
  const iconClass = `m-0 p-0 bi bi-circle-fill fs-xxs ${iconColor}`;
  const textOnHover = `hover-${iconColor}`;

  const key = `tag-${index}`;

  return (
    <BtnBare componentKey={key} flex="row" justify="center" align="center" margin={[{breakpoint: 'lg', b: 1}, { m: 0}]}>
        <div className="col-1 p-0 m-0 me-1 d-flex justify-content-center align-items-center fs-xs">
          <i className={iconClass}></i>
        </div>
        <div className={`col-11 p-0 pe-2 m-0 text-center text-nowrap fs-xs fst-italic color-light-1 ${textOnHover}`}>
            {tag}
        </div>
    </BtnBare>
  )
}