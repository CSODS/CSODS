import { useNavigate, useParams } from "react-router-dom";
import { BorderSelector, BtnSelector, ColorSelector, CssSelector, HoverSelector, TranslucentSelector } from "@/types";
import { DEFAULTS, ICONS } from "@constants/index";
import { BtnGroup, Button } from "@/components";
import { useProjectDataService, useProjectDetails, useProjectIcon } from "@/hooks";
import { redirectToUrl } from "@/utils";
import { getProjectLink } from "../utils";

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
            <div className='px-3 pb-3 ps-lg-0 card-body d-flex flex-column align-items-start text-light' style={{minHeight:280}}>
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
    const btnSelector: BtnSelector = 'btn-light-1';
    const borderSelector: BorderSelector = 'border-light-1';
    const hoverSelector: HoverSelector = 'hover-darken';
    const colorSelector: ColorSelector = 'color-light-1';
    const opacitySelector: TranslucentSelector = 'translucent-50';

    const btnSelectors: (CssSelector | string)[] = [
        'mt-1 py-0 px-1 ms-0 me-1 bg-transparent border border-0 rounded-pill fs-xs d-flex flex-row justify-content-center align-items-center',
        colorSelector
    ];

    const colSelectors = ["p-0 col d-flex flex-wrap align-items-start"];

    return (
      // <BtnGroup TagList={tagList} btnSelectors={btnSelectors} colSelectors={colSelectors}/>
      <div className="mx-0 mt-2 row w-100">
        <div className={colSelectors.join(' ')}>
            {
              tagList.map((tag, index) => {
                const key = `tag-${index}`
                return (
                  <Button selectorList={btnSelectors} componentKey={key}>
                    <div className="col-1 p-0 m-0 me-1 d-flex">
                      <i className="m-0 p-0 bi bi-circle-fill fs-xxs color-light-1"></i>
                    </div>
                    <div className='col-11 p-0 m-0 text-center text-nowrap fst-italic'>
                        {tag}
                    </div>
                  </Button>
                )
              })
            }
        </div>
    </div>
    )
}