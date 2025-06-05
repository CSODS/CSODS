import github_logo from '../../github_logo.png';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE, ENDPOINTS, ADDRESSES } from '../../constants/constants.js';

export function StudentProjects() {
//   const [projectList, setProjectList] = useState([]);
//   useEffect(() => {
//     axios.get(`${BASE+ENDPOINTS.PROJECTS}`).then((response) => {
//       // do something
//       setProjectList(response.data);
//     })
//   }, []);
  const navigate = useNavigate();

  const handleClick = (projectId) => {
    navigate(`${ADDRESSES.STUDENT_PROJECTS}/${projectId}`);
  }

  return (
    <div>
      {/* header */}
      <div className='p-0 mt-3 mb-5 d-flex flex-column align-items-center justify-content-center'>
        <div className='row g-0 d-flex justify-content-center align-items-center' style={{maxWidth:700}}>
            <div className='col-md-auto p-0 m-0 d-flex justify-content-center align-items-center'>
              <img src={github_logo} alt='...' className='header-logo shadow-lg'></img>
            </div>
            <div className='col-md p-0 ps-md-3 m-0 d-flex justify-content-center align-items-center'>
              <h1 className='fs-h1 bolder color-celeste text-shadow-m'>GitHub Projects</h1>
            </div>
        </div>
        <div className='px-3 fs-5 color-non-photo-blue'>
          Discover open source projects uploaded by our very own students.
        </div>
      </div>
      {/* search bar */}
      <div className='mt-5 d-flex justify-content-center align-items-center'>
        <div className='py-3 px-4 col-md-6 d-flex align-items-center justify-content-start border border-celeste rounded-pill bg-dark-purple'>
          <i className="bi bi-search color-celeste me-3"></i>
          <input type='text' className='m-0 fs-6 w-100 color-celeste' placeholder='Search projects...'/>
        </div>
      </div>
      <div className='mt-4'>
        <button type='button' className='btn-custom-1 rounded-pill my-1 mx-2 px-4 border-celeste'>All</button>
        <button type='button' className='btn-custom-1 rounded-pill my-1 mx-2 px-4 border-celeste'>JavaScript</button>
        <button type='button' className='btn-custom-1 rounded-pill my-1 mx-2 px-4 border-celeste'>Python</button>
        <button type='button' className='btn-custom-1 rounded-pill my-1 mx-2 px-4 border-celeste'>C#</button>
        <button type='button' className='btn-custom-1 rounded-pill my-1 mx-2 px-4 border-celeste'>C</button>
      </div>
      {/* project cards */}
      <div className='mx-0 px-3 mt-5 row row-cols-1 row-cols-md-2 row-gap-4 d-flex justify-content-center'>
        <div className='col' style={{maxWidth:700}}>
          {/* project card */}
          <div className='card project-card border-celeste rounded-4 bg-dark-purple translucent'>
            <div className='card-body pt-4 ps-4 d-flex flex-row align-items-start text-light'>
              <i className="bi bi-filetype-js fs-3"></i>
              <div className='mx-3'>
                {/* project title  */}
                <h5 className='card-title col-lg-6 text-start fs-3 color-celeste bolder'>Project 1</h5>
                {/* project description */}
                <p className='card-text my-1 text-start'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu mollis leo, 
                  at commodo turpis. Quisque venenatis iaculis facilisis. Donec tempor eu sem ut tincidunt.
                </p>
                {/* project tags */}
                <div className='my-1 d-flex flex-row align-items-start'>
                  <div className='py-1 px-3 ms-0 me-2 bg-raisin-black btn-custom-1 rounded-pill border border-celeste fs-xs'>
                    JavaScript
                  </div>
                  <div className='py-1 px-3 ms-0 me-2 bg-raisin-black btn-custom-1 rounded-pill border border-celeste fs-xs'>
                    FastAPI
                  </div>
                </div>
                {/* github link and view link */}
                <div className='mt-3 mb-0 d-flex flex-row align-items-center'>
                  <button type='button' className='px-4 py-2 bg-raisin-black d-flex flex-row align-items-center justify-content-center btn-custom-1 rounded-4 border-celeste'>
                    {/* <img src={github_logo} alt='...' className='img-fluid'/> */}
                    GitHub
                  </button>
                  <button type='button' className='ms-auto px-4 py-2 bg-raisin-black btn-custom-1 rounded-4 border-celeste' onClick={() => handleClick(1)}>View</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col' style={{maxWidth:700}}>
          <div className='card project-card border-celeste rounded-4 bg-dark-purple translucent'>
            <div className='card-body pt-4 ps-4 d-flex flex-row align-items-start text-light'>
              <i className="bi bi-filetype-py fs-3"></i>
              <div className='mx-3'>  
                <h5 className='card-title col-lg-6 text-start fs-3 color-celeste bolder'>Project 2</h5>
                <p className='card-text my-1 text-start'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu mollis leo, 
                  at commodo turpis. Quisque venenatis iaculis facilisis. Donec tempor eu sem ut tincidunt.
                </p>
                <div className='my-1 d-flex flex-row align-items-start'>
                  <div className='py-1 px-3 ms-0 me-2 bg-raisin-black btn-custom-1 rounded-pill border border-celeste fs-xs'>
                    Python
                  </div>
                  <div className='py-1 px-3 ms-0 me-2 bg-raisin-black btn-custom-1 rounded-pill border border-celeste fs-xs'>
                    MongoDB
                  </div>
                </div>
                <div className='mt-3 mb-0 d-flex flex-row align-items-center'>
                  <button type='button' className='px-4 py-2 bg-raisin-black btn-custom-1 rounded-4 border-celeste'>GitHub</button>
                  <button type='button' className='ms-auto px-4 py-2 bg-raisin-black btn-custom-1 rounded-4 border-celeste' onClick={() => handleClick(2)}>View</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        
      {
        // projectList.map((value, key) =>  {
        //   //  display data
        //   return <div> {value.ProjectName} {value.ProjectOwner} </div>
        // })
      }
    </div>  
  );
}

export function ProjectDetails() {
    return (
      <div className='d-flex flex-column'>
        {/* header container */}
        <div className='p-0 mb-5 d-flex flex-column align-items-center justify-content-center'>
          <h1 className='fs-1 bolder color-celeste text-shadow-m'>Project Title</h1>
          <div className='fs-5 fw-bold color-non-photo-blue'>
            Project Owner
          </div>
          <div className='col-md-11 mt-3 mx-2 px-3 py-4 rounded-4 bg-dark-purple border border-celeste text-light text-start' style={{maxWidth:1400}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Cras a nisl eros. Nullam elit augue, vulputate at auctor id, interdum in nisi. 
            Vestibulum et purus pellentesque, efficitur sapien in, mattis sapien. 
            Proin blandit mattis mi nec lacinia. Nulla commodo, purus eu fringilla blandit, 
            eros ipsum laoreet risus, imperdiet sagittis ligula libero non lorem. 
            Donec volutpat, metus tincidunt laoreet volutpat, arcu nulla mollis magna, 
            ut tristique risus nibh id sem. Etiam porta interdum vehicula. 
            Morbi non arcu accumsan, auctor mi in, ornare sapien. Suspendisse ex nulla, 
            ultricies a auctor quis, interdum eget purus.
          </div>
        </div>
        {/* metrics */}
        <div className='col-6 align-self-center row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 d-flex align-items-center justify-content-center' style={{maxWidth:700}}>
          {/* stars */}
          <div className='col' style={{maxWidth:150}}>
            <div className='bg-dark-purple card project-card rounded-5 pb-1 border-celeste'>
              <div className='card-body pb-0 flex-column align-items-center'>
                <i className="bi bi-stars color-celeste fs-1"></i>
                <p className='mt-1 mb-1 fw-bolder fs-5 color-non-photo-blue'>
                  1024
                </p>
              </div>
            </div>
          </div>
          
          {/* forks */}
          <div className='col' style={{maxWidth:150}}>
            <div className='bg-dark-purple card project-card rounded-5 pb-1 border-celeste'>
              <div className='card-body pb-0 flex-column align-items-center'>
                <i className="bi bi-plugin color-celeste fs-1"></i>
                <p className='mt-1 mb-1 fw-bolder fs-5 color-non-photo-blue'>
                  512
                </p>
              </div>
            </div>
          </div>
          
          {/* issues */}
          <div className='col' style={{maxWidth:150}}>
            <div className='bg-dark-purple card project-card rounded-5 pb-1 border-celeste'>
              <div className='card-body pb-0 flex-column align-items-center'>
                <i className="bi bi-exclamation-octagon color-celeste fs-1"></i>
                <p className='mt-1 mb-1 fw-bolder fs-5 color-non-photo-blue'>
                  256
                </p>
              </div>
            </div>
          </div>
          
          {/* contributors */}
          <div className='col' style={{maxWidth:150}}>
            <div className='bg-dark-purple card project-card rounded-5 pb-1 border-celeste'>
              <div className='card-body pb-0 flex-column align-items-center'>
                <i className="bi bi-person-workspace color-celeste fs-1"></i>
                <p className='mt-1 mb-1 fw-bolder fs-5 color-non-photo-blue'>
                  3
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Navigation Buttons */}
        <div className='mt-5 d-flex flex-row justify-content-center'>
            <button type='button' className='px-3 py-1 py-md-3 mx-2 bg-dark-pruple btn-custom-1 rounded-pill border-celeste'>Back to Projects</button>
            <button type='button' className='px-3 py-1 py-md-3 mx-2 bg-dark-pruple btn-custom-1 rounded-pill border-celeste'>View On GitHub</button>
        </div>
        {/* Tags */}
        <div className='mt-5 d-flex flex-column align-items-center'>
          <h1 className='fs-1 bolder color-non-photo-blue text-shadow-m'>Tags</h1>
          <div className='mt-4'>
            <button type='button' className='project-card bg-dark-purple rounded-pill mx-2 px-4 py-1 border-celeste color-celeste'>JavaScript</button>
            <button type='button' className='project-card bg-dark-purple rounded-pill mx-2 px-4 py-1 border-celeste color-celeste'>FastAPI</button>
          </div>
        </div>
        {/* Core Contributors */}
        <div className='mt-5 d-flex flex-column align-items-center'>
          <h1 className='fs-1 bolder color-non-photo-blue text-shadow-m'>Core Contributors</h1>
          {/* <div className='mt-4 d-flex flex-column flex-md-row row-gap-3 justify-content-center'>
            <div className='project-card px-5 bg-celeste rounded-5 mx-2 px-4 py-1 border border-dark-purple'>
              <p className='mt-1 mb-0 fs-6 color-dark-purple'>
                Owner
              </p>
              <i className="mt-0 bi bi-person-workspace color-dark-purple fs-h1"></i>
              <p className='mt-1 fw-bolder fs-5 color-dark-purple'>
                Username
              </p>
              <p className='mt-1 mb-1 fs-6 color-raisin-black'>
                Role
              </p>
            </div>
            <div className='d-flex flex-column'>
              <div className='project-card px-5 bg-dark-purple rounded-5 mx-2 px-4 py-1 border border-celeste'>
                <p className='mt-1 mb-0 fs-6 color-celeste'>
                  Contributor
                </p>
                <i className="mt-0 bi bi-person-workspace color-celeste fs-h1"></i>
                <p className='mt-1 fw-bolder fs-5 color-celeste'>
                  Username
                </p>
                <p className='mt-1 mb-1 fs-6 color-non-photo-blue'>
                  Role
                </p>
              </div>
            </div>
          </div> */}
          <div className='mt-4 w-100 row row-cols-1 row-cols-md-3 row-cols-lg-4 row-gap-3 justify-content-center'>
            <div className='col' style={{maxWidth:300}}>
              <div className='project-card px-5 bg-celeste rounded-5 mx-2 px-4 py-1 border border-dark-purple'>
                <p className='mt-1 mb-0 fs-6 color-dark-purple'>
                  Owner
                </p>
                <i className="mt-0 bi bi-person-workspace color-dark-purple fs-h1"></i>
                <p className='mt-1 fw-bolder fs-5 color-dark-purple'>
                  Username
                </p>
                <p className='mt-1 mb-1 fs-6 color-raisin-black'>
                  Role
                </p>
              </div>
            </div>
            <div className='col' style={{maxWidth:300}}>
              <div className='project-card px-5 bg-dark-purple rounded-5 mx-2 px-4 py-1 border border-celeste'>
                <p className='mt-1 mb-0 fs-6 color-celeste'>
                  Contributor
                </p>
                <i className="mt-0 bi bi-person-workspace color-celeste fs-h1"></i>
                <p className='mt-1 fw-bolder fs-5 color-celeste'>
                  Username
                </p>
                <p className='mt-1 mb-1 fs-6 color-non-photo-blue'>
                  Role
                </p>
              </div>
            </div>
            <div className='col' style={{maxWidth:300}}>
              <div className='project-card px-5 bg-dark-purple rounded-5 mx-2 px-4 py-1 border border-celeste'>
                <p className='mt-1 mb-0 fs-6 color-celeste'>
                  Contributor
                </p>
                <i className="mt-0 bi bi-person-workspace color-celeste fs-h1"></i>
                <p className='mt-1 fw-bolder fs-5 color-celeste'>
                  Username
                </p>
                <p className='mt-1 mb-1 fs-6 color-non-photo-blue'>
                  Role
                </p>
              </div>
            </div>
            <div className='col' style={{maxWidth:300}}>
              <div className='project-card px-5 bg-dark-purple rounded-5 mx-2 px-4 py-1 border border-celeste'>
                <p className='mt-1 mb-0 fs-6 color-celeste'>
                  Contributor
                </p>
                <i className="mt-0 bi bi-person-workspace color-celeste fs-h1"></i>
                <p className='mt-1 fw-bolder fs-5 color-celeste'>
                  Username
                </p>
                <p className='mt-1 mb-1 fs-6 color-non-photo-blue'>
                  Role
                </p>
              </div>
            </div>
            <div className='col' style={{maxWidth:300}}>
              <div className='project-card px-5 bg-dark-purple rounded-5 mx-2 px-4 py-1 border border-celeste'>
                <p className='mt-1 mb-0 fs-6 color-celeste'>
                  Contributor
                </p>
                <i className="mt-0 bi bi-person-workspace color-celeste fs-h1"></i>
                <p className='mt-1 fw-bolder fs-5 color-celeste'>
                  Username
                </p>
                <p className='mt-1 mb-1 fs-6 color-non-photo-blue'>
                  Role
                </p>
              </div>
            </div>
            <div className='col' style={{maxWidth:300}}>
              <div className='project-card px-5 bg-dark-purple rounded-5 mx-2 px-4 py-1 border border-celeste'>
                <p className='mt-1 mb-0 fs-6 color-celeste'>
                  Contributor
                </p>
                <i className="mt-0 bi bi-person-workspace color-celeste fs-h1"></i>
                <p className='mt-1 fw-bolder fs-5 color-celeste'>
                  Username
                </p>
                <p className='mt-1 mb-1 fs-6 color-non-photo-blue'>
                  Role
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
