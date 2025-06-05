import logo from '../../lucso-logo-no-bg.png'
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { COLORS } from '../../constants/constants';

export function PrimaryLayout() {
    useEffect(() => {
        document.body.style.backgroundColor = COLORS.RAISIN_BLACK;
    });
    return(
        <div>
            <div className="p-0 navbar navbar-expand-lg fixed-top bg-body-tertiary">    
                <div className="container-fluid bg-feldgrau header-container">
                    <a className="navbar-brand color-dark-purple fs-3 bolder" href="/">
                        <img src={logo} alt="CSO_LOGO" className='header-logo'/>
                        CSO:DS  
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar">
                        <div className="navbar-nav d-none d-lg-flex gap-2 position-absolute top-50 start-50 translate-middle">
                            <a href="/home" className="nav-link header-nav-element">Home</a>
                            <a href="/student_projects" className="nav-link header-nav-element">Projects</a>
                            <a href="/submit_project" className="nav-link header-nav-element">About</a>
                        </div>
                        <a href="/submit_project" className="ms-auto me-2 px-3 py-2 nav-link d-none d-lg-flex btn-custom-1 rounded-pill">
                            <a href="/submit_project" className="nav-link ms-2 me-1">Submit a Project</a>
                            <i className="bi bi-arrow-right-circle ms-2 me-1"></i>
                        </a>
                        
                        <div className="bg-dark-purple navbar-nav d-flex d-lg-none flex-column border border-celeste rounded-2">
                            <a href="/home" className="nav-link color-celeste">Home</a>
                            <a href="/student_projects" className="nav-link color-celeste">Projects</a>
                            <a href="/submit_project" className="nav-link color-celeste">About</a>
                            <a href="/submit_project" className="nav-link color-celeste">Submit a Project</a>
                        </div>
                    </div>
                </div>
            </div>
            <main className='pb-3'>
                <Outlet />
            </main>
        </div>
    );
}