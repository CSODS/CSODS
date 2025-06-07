import github_logo from '../../github_logo.png';
import { COLORS, DEVELOPMENT_TYPES, ICONS } from '../../constants/constants.js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE, ENDPOINTS, ADDRESSES } from '../../constants/constants.js';

function redirectToUrl(url) {
  window.open(url);
  return;
}

//#region Student Projects
export function StudentProjects() {
//   const [projectList, setProjectList] = useState([]);
//   useEffect(() => {
//     axios.get(`${BASE+ENDPOINTS.PROJECTS}`).then((response) => {
//       // do something
//       setProjectList(response.data);
//     })
//   }, []);

  const [projectList, setProjectList] = useState([
    {
      ProjectId: 1,
      ProjectNumber: 2310227,
      ProjectName: "Nexus Banking",
      ProjectDevType: DEVELOPMENT_TYPES.WEB_DEV,
      ProjectOwner: "Julius Trinidad",
      ProjectDescription: "A Banking App in C#",
      ProjectUrl: "https://github.com/zeraus00/E_Banking_System.git"
    },
    {
      ProjectId: 2,
      ProjectNumber: 2310228,
      ProjectName: "Mon App",
      ProjectDevType: DEVELOPMENT_TYPES.SOFTWARE_DEV,
      ProjectOwner: "Bogart Dela Mon",
      ProjectDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Curabitur vel condimentum quam. Phasellus non augue cursus, porta turpis sed, 
        pellentesque dui. Donec dolor ante, euismod in laoreet nec, feugiat eget ipsum. 
        Donec feugiat tempor urna non scelerisque. Donec venenatis at magna id tincidunt. 
        Cras facilisis non lectus non interdum. Aliquam ut urna et nulla posuere interdum 
        sit amet sit amet justo.`,
      ProjectUrl: "https://github.com/zeraus00/E_Banking_System.git"
    }
  ]);

  const navigate = useNavigate();

  const handleClick = (projectId) => {
    navigate(`${ADDRESSES.STUDENT_PROJECTS}/${projectId}`);
  }

  return (
    <div>
      {/* header */}
      <div data-bs-spy='scroll' data-bs-target='#nav-scroll' data-bs-offset='-100'>
        <div id='heading'></div>
      </div> 
      <div className='p-0 mt-3 mb-5 d-flex flex-column align-items-center justify-content-center'>
        <div className='row g-0 d-flex justify-content-center align-items-center' style={{maxWidth:700}}>
            <div className='col-md-auto p-0 m-0 d-flex justify-content-center align-items-center'>
              <img src={github_logo} alt='...' className='header-logo shadow-lg'></img>
            </div>
            <div className='col-md p-0 ps-md-3 m-0 d-flex justify-content-center align-items-center'>
              <h1 className='fs-h1 bolder color-light-2 text-shadow-m'>GitHub Projects</h1>
            </div>
        </div>
        <div className='px-3 fs-5 color-light-2'>
          Discover open source projects uploaded by our very own students.
        </div>
      </div>
      {/* search bar */}
      <div className='mt-5 d-flex justify-content-center align-items-center'>
        <div className='py-3 px-4 col-md-6 d-flex align-items-center justify-content-start border border-light-1 rounded-pill bg-dark-1 translucent'>
          <i className="bi bi-search color-light-2 me-3"></i>
          <input type='text' className='m-0 fs-6 w-100 color-light-2' placeholder='Search projects...'/>
        </div>
      </div>
      <div className='mt-4'>
        <button type='button' className='btn-dark-1 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1'>All</button>
        <button type='button' className='btn-dark-1 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1'>JavaScript</button>
        <button type='button' className='btn-dark-1 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1'>Python</button>
        <button type='button' className='btn-dark-1 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1'>C#</button>
        <button type='button' className='btn-dark-1 rounded-pill my-1 mx-2 px-4 border border-1 border-light-1'>C</button>
      </div>
      {/* project cards */}
      <div className='mx-0 px-3 mt-5 row row-cols-1 row-cols-md-2 row-gap-4 d-flex justify-content-center'>
        {
          projectList.map((value, key) => {
            return (
              <div className='col' style={{maxWidth:700}}>
                {/* project card */}
                <div className='ps-lg-2 card project-card border-light-1 rounded-4 bg-dark-1 translucent'>
                  <div className='row g-0'>
                    <div className='pt-3 col-lg-1'>
                      <i className={`${ICONS[value.ProjectDevType]} color-light-2 fs-4`}></i>
                    </div>
                    <div className='col-lg-11'>
                      <div className='px-3 pb-3 ps-lg-0 card-body d-flex flex-column align-items-start text-light' style={{minHeight:290}}>
                        {/* project title  */}
                          <h5 className='card-title text-start fs-3 color-light-2 bolder'>{value.ProjectName}</h5>
                          {/* project description */}
                          <p className='card-text my-1 text-start'>{
                            value.ProjectDescription.length > 190
                            ? value.ProjectDescription.slice(0, 190) + "..." 
                            : value.ProjectDescription
                          }
                          </p>
                          <div className='mt-auto mx-0 row col-12'>
                            {/* project tags */}
                            <div className='ps-0 d-flex flex-row align-items-start'>
                              <div className='py-1 px-3 ms-0 me-2 bg-dark-1 btn-dark-1 rounded-pill border border-light-1 fs-xs'>
                                JavaScript
                              </div>
                              <div className='py-1 px-3 ms-0 me-2 bg-dark-1 btn-dark-1 rounded-pill border border-light-1 fs-xs'>
                                FastAPI
                              </div>
                            </div>
                            {/* github link and view link */}
                            <div className='mt-3 mb-0 ps-0 pe-0 d-flex flex-row align-items-center'>
                              <button type='button' className='col-lg-3 px-4 py-2 ms-0 me-3 btn-light-1 rounded-4 border border-0' onClick={() => redirectToUrl(value.ProjectUrl)}>
                                {/* <img src={github_logo} alt='...' className='img-fluid'/> */}
                                GitHub
                              </button>
                              <button type='button' className='col-lg-3 px-4 py-2 ms-0 me-3 btn-light-1 rounded-4 border border-0' onClick={() => handleClick(1)}>View</button>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
      
      {/* Up Button */}
      <div className='m-0 mt-3 pb-2 px-2 d-flex d-lg-none sticky-bottom justify-content-end'>
        <a href='#heading' className='px-2 bg-dark-2 project-card rounded-pill d-flex justify-content-center align-content-center'>
          <i className="bi bi-arrow-bar-up fs-6 color-light-2"></i>
        </a>
      </div>
    </div>  
  );
}
//#endregion

export function ProjectDetails() {
  const [sampleProject] = useState({
    ProjectId: 1,
    ProjectNumber: 2310227,
    ProjectName: "Nexus Banking",
    ProjectOwner: "Julius Trinidad",
    ProjectDescription: "A Banking App in C#",
    ProjectUrl: "https://github.com/zeraus00/E_Banking_System.git"
  });

  const [projectDetails] = useState({
    Contributors: [
      {Username: "steins0668", Role: "Contributor", Subrole: "Backend Dev"},
      {Username: "eounaria", Role: "Contributor", Subrole: "Frontend Dev"},
      {Username: "zeraus00", Role: "Owner", Subrole: "Fullstack Dev"}
    ],
    Tags: ["C#", "Blazor Web App", "Web Application", "Web Dev", "SQL"]
  });

  return (
    <div className='d-flex flex-column'>
      {/* header container */}
      <div className='p-0 mt-2 mb-5 d-flex flex-column align-items-center justify-content-center'>
        <h1 className='fs-1 bolder color-light-2 text-shadow-m'>{sampleProject.ProjectName}</h1>
        <div className='fs-5 fw-bold color-light-2'>
          {sampleProject.ProjectOwner}
        </div>
        <div className='col-md-11 mt-3 mx-2 px-3 py-4 rounded-4 bg-dark-1 border border-light-1 text-light text-start' style={{maxWidth:1400}}>
          {sampleProject.ProjectDescription}
          {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Cras a nisl eros. Nullam elit augue, vulputate at auctor id, interdum in nisi. 
          Vestibulum et purus pellentesque, efficitur sapien in, mattis sapien. 
          Proin blandit mattis mi nec lacinia. Nulla commodo, purus eu fringilla blandit, 
          eros ipsum laoreet risus, imperdiet sagittis ligula libero non lorem. 
          Donec volutpat, metus tincidunt laoreet volutpat, arcu nulla mollis magna, 
          ut tristique risus nibh id sem. Etiam porta interdum vehicula. 
          Morbi non arcu accumsan, auctor mi in, ornare sapien. Suspendisse ex nulla, 
          ultricies a auctor quis, interdum eget purus. */}
        </div>
      </div>
      {/* metrics */}
      <div className='col-6 align-self-center row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 d-flex align-items-center justify-content-center' style={{maxWidth:700}}>
        {/* stars */}
        <div className='col' style={{maxWidth:150}}>
          <div className='bg-dark-1 card project-card rounded-5 pb-1 border-light-1'>
            <div className='card-body pb-0 flex-column align-items-center'>
              <i className="bi bi-stars color-light-2 fs-1"></i>
              <p className='mt-1 mb-1 fw-bolder fs-5 color-light-2'>
                1024
              </p>
            </div>
          </div>
        </div>
        
        {/* forks */}
        <div className='col' style={{maxWidth:150}}>
          <div className='bg-dark-1 card project-card rounded-5 pb-1 border-light-1'>
            <div className='card-body pb-0 flex-column align-items-center'>
              <i className="bi bi-plugin color-light-2 fs-1"></i>
              <p className='mt-1 mb-1 fw-bolder fs-5 color-light-2'>
                512
              </p>
            </div>
          </div>
        </div>
        
        {/* issues */}
        <div className='col' style={{maxWidth:150}}>
          <div className='bg-dark-1 card project-card rounded-5 pb-1 border-light-1'>
            <div className='card-body pb-0 flex-column align-items-center'>
              <i className="bi bi-exclamation-octagon color-light-2 fs-1"></i>
              <p className='mt-1 mb-1 fw-bolder fs-5 color-light-2'>
                256
              </p>
            </div>
          </div>
        </div>
        
        {/* contributors */}
        <div className='col' style={{maxWidth:150}}>
          <div className='bg-dark-1 card project-card rounded-5 pb-1 border-light-1'>
            <div className='card-body pb-0 flex-column align-items-center'>
              <i className="bi bi-person-workspace color-light-2 fs-1"></i>
              <p className='mt-1 mb-1 fw-bolder fs-5 color-light-2'>
                3
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className='mt-5 d-flex flex-row justify-content-center'>
          <button type='button' className='px-3 py-1 py-md-3 mx-2 bg-dark-pruple btn-dark-1 rounded-pill border border-1 border-light-1'>Back to Projects</button>
          <button type='button' className='px-3 py-1 py-md-3 mx-2 bg-dark-pruple btn-dark-1 rounded-pill border border-1 border-light-1'>View On GitHub</button>
      </div>
      {/* Tags */}
      <div className='mt-5 d-flex flex-column  align-items-center'>
        <h1 className='fs-1 bolder color-light-2 text-shadow-m'>Tags</h1>
        <div className='mt-4'>
          {
            // projectList.map((value, key) =>  {
            //   //  display data
            //   return <div> {value.ProjectName} {value.ProjectOwner} </div>
            // })
            projectDetails.Tags.map((value, key) => {
              return <button type='button' className='project-card bg-dark-1 rounded-pill mx-2 mb-2 px-4 py-1 border border-1 border-light-1 color-light-2'>{value}</button>
            })
          }
          {/* <button type='button' className='project-card bg-dark-2 rounded-pill mx-2 px-4 py-1 border-light-1 color-light-2'>JavaScript</button>
          <button type='button' className='project-card bg-dark-2 rounded-pill mx-2 px-4 py-1 border-light-1 color-light-2'>FastAPI</button> */}
        </div>
      </div>
      {/* Core Contributors */}
      <div className='mt-5 d-flex flex-column align-items-center'>
        <h1 className='fs-1 bolder color-light-2 text-shadow-m'>Core Contributors</h1>
        <div className='mt-4 w-100 row row-cols-1 row-cols-md-3 row-cols-lg-4 row-gap-3 justify-content-center'>
          {
            projectDetails.Contributors.map((value, key) => {
              let styles = {bgColor: "", color: ""}
              switch (value.Role) {
                case "Owner":
                  styles.bgColor = 'bg-light-1';
                  styles.color = 'color-dark-2';
                  styles.colorSecondary = 'color-dark-1';
                  break;
                case "Contributor":
                  styles.bgColor = 'bg-dark-1';
                  styles.color = 'color-light-1';
                  styles.colorSecondary = 'color-light-2';
                  break;
                default:
                  break;
              }
              return (
                <div className='col' style={{maxWidth:300}}>
                  <div className={`${styles.bgColor} project-card px-5 rounded-5 mx-2 px-4 py-1 border border-2 border-dark-2`}>
                    <p className={`mt-1 mb-0 fs-6 ${styles.color}`}>
                      {value.Role}
                    </p>
                    <i className={`mt-0 bi bi-person-workspace ${styles.color} fs-h1`}></i>
                    <p className={`mt-1 fw-bolder fs-5 ${styles.color}`}>
                      {value.Username}
                    </p>
                    <p className={`mt-1 mb-1 fs-6 ${styles.colorSecondary}`}>
                      {value.Subrole}
                    </p>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}
