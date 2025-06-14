import logo from '../../lucso-logo-no-bg.png'
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { COLORS, ADDRESSES } from '../../constants/constants';
import { bgConstants } from '../../constants/bg-constants.js';

export function PrimaryLayout() {
    // useEffect(() => {
    //     document.body.style.backgroundColor = COLORS.RAISIN_BLACK;
    // });
    
    function randomX() {
        return `${Math.floor(Math.random() * 90)}%`
    }

    return(
        <div>
            <div className="p-0 navbar navbar-expand-lg sticky-top">    
                <div className="container-fluid bg-dark-1 header-container">
                    <a className="navbar-brand color-light-1 fs-4 bolder" href={ADDRESSES.LANDING_PAGE}>
                        <img src={logo} alt="CSO_LOGO" className='header-logo'/>
                        CSO:DS  
                    </a>
                    <button className="navbar-toggler bg-light-2 color-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar">
                        <div className="navbar-nav gap-4 mx-auto">
                            <a href={ADDRESSES.HOME} className="nav-link header-nav-element">Home</a>
                            <a href={ADDRESSES.STUDENT_PROJECTS} className="nav-link header-nav-element">Projects</a>
                            <a href={ADDRESSES.ABOUT} className="nav-link header-nav-element">About</a>
                        </div>
                        <a href={ADDRESSES.SUBMIT_PROJECT} className="submit-btn nav-link d-lg-flex rounded-pill">
                            <div href={ADDRESSES.SUBMIT_PROJECT}>Submit a Project</div>
                            <i className="bi bi-arrow-right-circle ms-2 me-1"></i>
                        </a>
                        
                        <div className="bg-dark-2 navbar-nav d-flex d-lg-none flex-column border border-light-1 rounded-2">
                            <a href={ADDRESSES.HOME} className="nav-link color-light-2">Home</a>
                            <a href={`${ADDRESSES.STUDENT_PROJECTS_ROOT}/1`} className="nav-link color-light-2">Projects</a>
                            <a href={ADDRESSES.ABOUT} className="nav-link color-light-2">About</a>
                            <a href={ADDRESSES.SUBMIT_PROJECT} className="nav-link color-light-2">Submit a Project</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-container">
                  <div className="grid-overlay"></div>
                  <div className="gradient-orb orb1"></div>
                  <div className="gradient-orb orb2"></div>
                  <div className="gradient-orb orb3"></div>

                {bgConstants.map((x, index) => (
                    <div
                        key = {index}
                        className = {`bg-code ${x.label}`}
                        style = {{
                            left: randomX(),
                            animationDelay: `${index * 2}s`,
                        }}
                    >
                        {x.content}
                        </div>
                ))}
            </div>

            <main className='pb-3'>
                <Outlet />
            </main>
        </div>
    );
}