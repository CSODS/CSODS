import React from 'react';
import ADDRESSES from '../../constants/addresses/addresses';

function Home() {
  const projectsFirstPage = `${ADDRESSES.STUDENT_PROJECTS.ROOT}/1`;

  return (
    <div className='pt-4 d-flex justify-content-center'>
      <div className='container-md mx-3 py-3 d-flex flex-row justify-content-center bg-light-1 translucent-70 rounded-5' style={{maxWidth:1100}}>
        <div className='pb-4 m-4 card border border-0 bg-transparent'>
          <div className='row g-0'>
            <div className='col-md-6 d-flex d-md-none'>
              <img src='/homepage_img.png' alt='...' className='card-img'></img>
            </div>
            <div className='ps-md-3 col-md-6 d-flex align-items-end'>
              <div className='card-body mx-0 ps-0 pb-0 align-self-end d-flex flex-column justify-content-end'>
                <div className='mt-4 mb-1 p-0 d-flex'>
                  <div className='p-3 py-0 fs-6 fs-light btn btn-light-1 rounded-pill text-center'>
                    #DevelopersSpace
                  </div>
                </div>
                <h5 className="card-title col-md-9 mt-1 mb-3 text-start fs-3 color-dark-2 bolder">Your Space to Learn, Build, and Grow.</h5>
                <p className="card-text col-md-9 mt-1 mb-3 color-dark-1 text-start">
                  <span className='text-emphasize'>Computer Science Organization: Developers’ Space </span>
                  is a digital hub for students of the Computer Science Department where we foster innovation, 
                  collaboration, and academic excellence in the field of computing.
                </p>
                <p className="card-text col-md-9 mt-1 mb-4 text-start color-dark-3 fst-italic">
                  Explore. Learn. Contribute.
                </p>
                <div className='d-flex'>
                  <a href={projectsFirstPage} className="px-3 py-2 nav-link d-flex flex-row align-items-center justify-content-center btn btn-dark-1 rounded-pill py-2">
                    <a href={projectsFirstPage} className="nav-link ms-3 me-1 fs-6">View Projects</a>
                    <i className="bi bi-arrow-right-circle ms-3 me-1"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-md-6 d-none d-md-flex'>
              <img src='/homepage_img.png' alt='...' className='card-img'></img>
            </div>
          </div>
        </div>
      </div>
    </div> 
  );
}

export default Home;