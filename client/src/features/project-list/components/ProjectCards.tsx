
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BorderSelector, BtnSelector, ColorSelector, CssSelector, HoverSelector, TranslucentSelector } from "@/types";
import { ADDRESSES, DEFAULTS, ICONS } from "@constants/index";
import BtnGroup from "@/components/shared/ButtonGroup";
import { ProjectDetailsContext, ProjectDataServiceContext } from "@/components/shared/Providers";

export function ProjectCard () {
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

  const { pageNumber } = useParams();
  const projectDetails = useContext(ProjectDetailsContext);
  const projectDataService = useContext(ProjectDataServiceContext)!;

  const projectTags = projectDataService.getProjectTagValues(projectDetails);
  const tagList = projectDataService.getProjectTagList(projectTags);
  const projectDescription = projectDataService.omitProjectDescription(DEFAULTS.LOREM_IPSUM);

  const [ iconClass, setIconClass ] = useState<string>('');

  useEffect(() => {
    type DevType = keyof typeof ICONS;
    const getIconClass = (devType: DevType) => {
      const iconClass = ICONS[devType];
      return iconClass;
    }
    const iconClass = getIconClass(projectTags.DevType as DevType);
    setIconClass(iconClass);
  }, [projectTags.DevType]);

  const projectId: number = projectDetails.Project.ProjectId;

  return (
    <div key={`projectId-${projectId}`} className="col" style={{ maxWidth:700 }}>
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
                <TagRow tagList={tagList}/>
                {/* github link and view link */}
                <div className='mt-3 mb-0 ps-0 pe-0 d-flex flex-row align-items-center'>
                  <button type='button' className='col-lg-3 px-4 py-2 ms-0 me-3 btn btn-light-1 rounded-4 border border-1 border-dark-3' onClick={() => redirectToUrl(projectDetails.Project.GitHubUrl)}>
                      {/* <img src={github_logo} alt='...' className='img-fluid'/> */}
                      GitHub
                  </button>
                  <button type='button' className='col-lg-3 px-4 py-2 ms-0 me-3 btn btn-dark-3 rounded-4 border border-1 border-light-1' onClick={() => viewProject(Number(pageNumber), projectId)}>View</button>
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
    const btnSelector: BtnSelector = 'btn-dark-1';
    const borderSelector: BorderSelector = 'border-light-1';
    const hoverSelector: HoverSelector = 'hover-invert';
    const colorSelector: ColorSelector = 'color-light-1';
    const opacitySelector: TranslucentSelector = 'translucent-100';

    const btnSelectors: (CssSelector | string)[] = [
        'mt-1 py-1 px-3 ms-0 me-2 btn rounded-pill fs-xs',
        btnSelector,
        borderSelector,
        hoverSelector,
        colorSelector,
        opacitySelector
    ];

    const colSelectors = ["p-0 col d-flex flex-wrap align-items-start"];

    return <BtnGroup TagList={tagList} btnSelectors={btnSelectors} colSelectors={colSelectors}/>
}