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
            <div className="navbar navbar-expand-lg fixed-top bg-body-tertiary no-padding">    
                <div className="container-fluid bg-feldgrau header-container ">
                    <a className="navbar-brand header-brand fs-3 bolder" href="/">
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
                        <a href="/submit_project" className="nav-link d-none d-lg-flex position-absolute top-50 end-5 translate-middle-y btn-custom-1 rounded-pill">
                            <a href="/submit_project" className="nav-link btn-element">Submit a Project</a>
                            <i className="bi bi-arrow-right-circle btn-element"></i>
                        </a>
                        
                        <div className="navbar-nav d-flex d-lg-none flex-column header-nav-element">
                            <a href="/home" className="nav-link">Home</a>
                            <a href="/student_projects" className="nav-link">Projects</a>
                            <a href="/submit_project" className="nav-link">About</a>
                            <a href="/submit_project" className="nav-link">Submit a Project</a>
                        </div>
                    </div>
                </div>
            </div>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export function ReversedLayout() {
    useEffect(() => {
        document.body.style.backgroundColor = COLORS.FELDGRAU;
    });
    return(
        <div>
            <div className="navbar navbar-expand-lg fixed-top bg-body-tertiary no-padding">    
                <div className="container-fluid bg-feldgrau header-container ">
                    <a className="navbar-brand header-brand" href="/">
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
                        <a href="/submit_project" className="nav-link d-none d-lg-flex position-absolute top-50 end-5 translate-middle-y btn-custom-1 rounded-pill">
                            <a href="/submit_project" className="nav-link btn-element">Submit a Project</a>
                            <i className="bi bi-arrow-right-circle btn-element"></i>
                        </a>
                        
                        <div className="navbar-nav d-flex d-lg-none flex-column header-nav-element">
                            <a href="/home" className="nav-link">Home</a>
                            <a href="/student_projects" className="nav-link">Projects</a>
                            <a href="/submit_project" className="nav-link">About</a>
                            <a href="/submit_project" className="nav-link">Submit a Project</a>
                        </div>
                    </div>
                </div>
            </div>
            <main>
                <Outlet />
            </main>
        </div>
    );
}