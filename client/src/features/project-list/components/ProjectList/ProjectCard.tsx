import { useNavigate, useParams } from "react-router-dom";
import { BtnBare } from "@/components";
import { DEFAULTS } from "@/constants";
import { useNavigateWithTag, useProjectDataService, useProjectDetails, useProjectIcon, useProjectTagList } from "@/hooks";
import { getProjectLink, redirectToUrl } from "@/utils";
import { useTagColorMap } from "../../hooks/context";

export default function ProjectCard () {
  const navigate = useNavigate();
  const viewProject = () => { navigate(getProjectLink(Number(pageNumber), projectId)) }

  const { pageNumber } = useParams();
  const projectDetails = useProjectDetails();
  const projectDataService = useProjectDataService();
  const projectDescription = projectDataService.omitProjectDescription(DEFAULTS.LOREM_IPSUM);

  const tagList = useProjectTagList();
  const iconClass = useProjectIcon();

  const projectId: number = projectDetails.Project.ProjectId;

  return (
    <div className='card project-card-dark-3 translucent-40 border border-0 rounded-2'>
      <div className='row g-0'>
        {/* card icon desktop */}
        <div className='col-lg-1 pt-3 d-lg-block d-none bg-dark-4 rounded-start-2'>
          <i className={`${iconClass} color-light-2 fs-4`}></i>
        </div>
        
        {/* card icon tablet/mobile*/}
        <div className='col-lg-1 py-1 d-lg-none d-block bg-dark-4 rounded-top-2'>
          <i className={`${iconClass} color-light-2 fs-4`}></i>
        </div>

        <div className='col-lg-11 ps-lg-3 ps-2'>
          <div className='pb-3 ps-0 card-body d-flex flex-column align-items-start text-light' style={{minHeight:260}}>
            {/* project title  */}
            <h5 className='card-title text-start fs-3 color-light-2 bolder'>{projectDetails.Project.ProjectTitle}</h5>
            {/* project description */}
            <small className='card-text my-1 text-start lh-sm'>{projectDescription}</small>
            <TagRow tagList={tagList}/>
            {/* card buttons desktop */}
            <div className='mt-auto mx-0 row col-12'>
              {/* project tags */}
              {/* github link and view link */}
              <div className='mt-3 mb-2 ps-0 pe-0 d-lg-flex d-none flex-row align-items-center'>
                <button type='button' className='col-3 px-3 py-2 ms-0 me-3 btn-dark-4 hover-lighten rounded-2 border border-0' onClick={() => redirectToUrl(projectDetails.Project.GitHubUrl)}>
                    GitHub
                </button>
                <button type='button' className='col-3 px-3 py-2 ms-0 me-3 btn-dark-4 hover-lighten rounded-2 border border-0' onClick={() => viewProject()}>View</button>
              </div>
            </div>
          </div>
        </div>
        {/* card buttons tablet/mobile */}
        <div className='mt-auto d-lg-none d-flex flex-row bg-dark-4 rounded-bottom'>
          <div className="w-100 my-1 ps-1 d-flex flex-col justify-content-start">
            <button type='button' className='m-1 mx-2 px-1 btn-dark-3 translucent-50 hover-lighten rounded-2 border border-0 justify-content-center align-items-center' onClick={() => redirectToUrl(projectDetails.Project.GitHubUrl)}>
              <i className="m-0 bi bi-github"/>
            </button>
            <button type='button' className='m-1 px-1 btn-dark-3 translucent-50 hover-lighten rounded-2 border border-0 justify-content-center align-items-center' onClick={() => viewProject()}>
              <i className="m-0 bi bi-eye-fill"/>
            </button>
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
                <Tag key={`${tag}-${index}`} tag={tag}/>
              )
            })
          }
      </div>
  </div>
  )
}

interface TagProps {
  tag: string;
}

function Tag({ tag }: TagProps) {
  const tagColorMap = useTagColorMap();
  const iconColor = tagColorMap.get(tag);
  const iconClass = `m-0 p-0 bi bi-circle-fill fs-xxs ${iconColor}`;
  const textOnHover = `hover-${iconColor}`;

  const callbackFn = useNavigateWithTag(tag);

  return (
    <BtnBare flex="row" justify="center" align="center" margin={[{breakpoint: 'lg', b: 1}, { m: 0}]} callBackFn={callbackFn}>
        <div className="flex-col p-0 m-0 me-1 d-flex justify-content-center align-items-center fs-xs">
          <i className={iconClass}></i>
        </div>
        <div className={`flex-col p-0 pe-2 m-0 text-center text-nowrap fs-xs fst-italic color-light-1 ${textOnHover}`}>
            {tag}
        </div>
    </BtnBare>
  )
}