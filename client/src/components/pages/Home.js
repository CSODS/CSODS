import homepage_img from '../../homepage_img.png';
import React from 'react';

function Home() {
  return (
    <div>
      {/* <div className="card h-75 w-75 ps-3 position-absolute start-50 translate-middle-x home-card">
        <div className="card-body">
          <div className='row row-cols-2 h-100'>
            <div className='col position-relative'>
              <div className='ps-3 pt-4 position-absolute top-50 translate-middle-y text-start'>
                <div className='mt-4 col-lg-3 home-card-element txt-sm btn-url-1 text-center'>#DevelopersSpace</div>
                <h3 class="card-title w-75 home-card-element bolder">Your Space to Learn, Build, and Grow.</h3>
                <p class="card-text w-75 home-card-element">
                  <span className='text-emphasize'>Computer Science Organization: Developers’ Space </span>
                  is a digital hub for students of the Computer Science Department where we foster innovation, 
                  collaboration, and academic excellence in the field of computing.
                </p>
                <p class="card-text w-75 home-card-element color-non-photo-blue">
                  Explore. Learn. Contribute.
                </p>
                <a href="/student_projects" className="nav-link col-lg-4 d-lg-flex home-card-element btn-url-1 btn-thick">
                  <a href="/student_projects" className="nav-link btn-element">View Projects</a>
                  <i className="bi bi-arrow-right-circle btn-element"></i>
                </a>
              </div>
            </div>
            <div className='col-lg-6'>
              <img src={homepage_img} alt='...' className='home-page-img'></img>
            </div>
          </div>
        </div>
      </div> */}
      <div className='h-75 w-75 ps-3 position-absolute start-50 translate-middle-x home-card row row-cols-2'>
        <div className='card col pb-4 home-subcard d-flex'>
          <div className='card-body pb-0 align-self-end d-flex flex-column justify-content-end'>
            <div className='mt-4 p-2 col-lg-3 home-card-element txt-sm btn-url-1 text-center'>#DevelopersSpace</div>
            <h3 class="card-title w-75 home-card-element text-start fs-2 bolder">Your Space to Learn, Build, and Grow.</h3>
            <p class="card-text w-75 home-card-element text-start">
              <span className='text-emphasize'>Computer Science Organization: Developers’ Space </span>
              is a digital hub for students of the Computer Science Department where we foster innovation, 
              collaboration, and academic excellence in the field of computing.
            </p>
            <p class="card-text w-60 home-card-element text-start color-non-photo-blue">
              Explore. Learn. Contribute.
            </p>
            <a href="/student_projects" className="nav-link col-lg-4 d-lg-flex home-card-element btn-url-1 btn-thick">
              <a href="/student_projects" className="nav-link btn-element">View Projects</a>
              <i className="bi bi-arrow-right-circle btn-element"></i>
            </a>
          </div>
        </div>
        <div className='card col home-subcard d-flex flex-column justify-content-center align-items-start'>
          <img src={homepage_img} alt='...' className='card-img'></img>
        </div>
      </div>

    </div>
    
          
  );
}

export default Home;