import { DEVELOPMENT_TYPES, ICONS } from '../../constants/project_data/tags';
import * as DEFAULTS from '../../constants/defaults';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProjectDetails, IAllProjectTags } from '../../viewModels/csods/csodsApiInterfaces';
import { ProjectDataService } from '../../utils/data/ProjectDataService';
import ApiHandler from '../../utils/api/ApiHandler';
import ProjectCard from './StudentProjectsComponents/ProjectCards';
import Paginator from './StudentProjectsComponents/Paginator';

//#region Student Projects
export default function StudentProjects() {

  const [projectList, setProjectList] = useState<IProjectDetails[]>(DEFAULTS.PROJECT_LIST);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [projectTags, setProjectTags] = useState<IAllProjectTags>(DEFAULTS.TAGS);

  const [projectDataService, setProjectDataService] = useState<ProjectDataService>(
    new ProjectDataService(projectTags)
  )

  const { pageNumber } = useParams();

  useEffect(() => {
    const apiHandler = new ApiHandler();
    const loadProjectList = async() => {
      if (pageNumber){
        const projectsPage = await apiHandler.GetProjectsPage(pageNumber);
        if (projectsPage && projectsPage.Projects) {
          setTotalPages(projectsPage.TotalPages);
          setProjectList(projectsPage.Projects);
        }
      }
    }
    loadProjectList();
  }, [pageNumber]);

  useEffect(() => {
    const apiHandler = new ApiHandler();
    const loadTagData = async() => {
      const tagData = await apiHandler.GetAllTags();
      if (tagData) {
        setProjectTags(tagData);
        setProjectDataService(new ProjectDataService(tagData));
      }
    }
    loadTagData();
  }, []);

  return (
    <div>
      {/* header */}
      <Header/>
      {/* search bar */}
      <SearchBar/>
      {/* project cards */}
      <div className='mx-0 px-3 mt-5 row row-cols-1 row-cols-md-2 row-gap-4 d-flex justify-content-center'>
        {
          projectList.map((value) => {
            const projectTags = projectDataService.getProjectTagValues(value);

            type DevType = keyof typeof ICONS;
            const iconKey = projectTags.DevType as DevType;
            const iconClass: string = ICONS[iconKey];
            const projectDescription: string = projectDataService.omitProjectDescription(DEFAULTS.PROJECT_DESCRIPTION);
            return (
              <ProjectCard
                key={value.Project.ProjectId}
                pageNumber={Number(pageNumber)}
                iconClass={iconClass}
                projectDetails={value}
                projectTags={projectTags}
                projectDescription={projectDescription}
              />
            );
          })
        }
      </div>
      {/* Up Button */}
      <UpButton/>
      {/* Paginator */}
      <Paginator totalPages={totalPages} currentPage={Number(pageNumber)}/>
    </div>  
  );
}
//#endregion
function Header() {
  return (
    <div>
      <div data-bs-spy='scroll' data-bs-target='#nav-scroll' data-bs-offset='-100'>
        <div id='heading'></div>
      </div> 
      <div className='p-0 mt-3 mb-5 d-flex flex-column align-items-center justify-content-center'>
        <div className='row g-0 d-flex justify-content-center align-items-center' style={{maxWidth:700}}>
            <div className='col-md-auto p-0 m-0 d-flex justify-content-center align-items-center'>
              <img src='/github_logo.png' alt='...' className='header-logo shadow-lg'></img>
            </div>
            <div className='col-md p-0 ps-md-3 m-0 d-flex justify-content-center align-items-center'>
              <h1 className='fs-h1 bolder color-light-2 text-shadow-m'>GitHub Projects</h1>
            </div>
        </div>
        <div className='px-3 fs-5 color-light-2'>
          Discover open source projects uploaded by our very own students.
        </div>
      </div>
    </div>
  );
}

function SearchBar() {
  return(
    <div>
      <div className='mt-5 d-flex justify-content-center align-items-center'>
        <div className='py-3 px-4 col-md-6 d-flex align-items-center justify-content-start border border-light-1 rounded-pill bg-light-3 translucent-20'>
          <i className="bi bi-search color-light-1 me-3"></i>
          <input type='text' className='m-0 fs-6 w-100 color-light-1' placeholder='Search projects...'/>
        </div>
      </div>
      <div className='mt-4'>
        <button type='button' className='btn btn-dark-3 translucent-60 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1'>All</button>
        <button type='button' className='btn btn-dark-3 translucent-60 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1'>JavaScript</button>
        <button type='button' className='btn btn-dark-3 translucent-60 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1'>Python</button>
        <button type='button' className='btn btn-dark-3 translucent-60 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1'>C#</button>
        <button type='button' className='btn btn-dark-3 translucent-60 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1'>C</button>
      </div>
    </div>
  );
}

function UpButton() {
  return (
    <div className='m-0 mt-3 pb-2 px-2 d-flex d-lg-none sticky-bottom justify-content-end'>
      <a href='#heading' className='px-2 bg-dark-2 project-card rounded-pill d-flex justify-content-center align-content-center'>
        <i className="bi bi-arrow-bar-up fs-6 color-light-2"></i>
      </a>
    </div>
  );
}
