import { Outlet } from 'react-router-dom';
import { ADDRESSES } from '../../constants/constants';

export function PrimaryLayout() {
    // useEffect(() => {
    //     document.body.style.backgroundColor = COLORS.RAISIN_BLACK;
    // });
    return(
        <div>
            <div className="p-0 navbar navbar-expand-lg sticky-top bg-body-tertiary">    
                <div className="px-lg-5 container-fluid bg-dark-1 header-container">
                    <a className="navbar-brand color-light-1 fs-4 bolder" href={ADDRESSES.LANDING_PAGE}>
                        <img src='/lucso-logo-no-bg.png' alt="CSO_LOGO" className='header-logo'/>
                        CSO:DS  
                    </a>
                    <button className="navbar-toggler bg-light-2 color-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar">
                        <div className="navbar-nav d-none d-lg-flex gap-2 position-absolute top-50 start-50 translate-middle">
                            <a href={ADDRESSES.HOME} className="nav-link header-nav-element">Home</a>
                            <a href={ADDRESSES.STUDENT_PROJECTS} className="nav-link header-nav-element">Projects</a>
                            <a href={ADDRESSES.ABOUT} className="nav-link header-nav-element">About</a>
                        </div>
                        <a href={ADDRESSES.SUBMIT_PROJECT} className="ms-auto me-2 px-2 py-1 nav-link d-none d-lg-flex btn-light-1 rounded-pill">
                            <a href={ADDRESSES.SUBMIT_PROJECT} className="nav-link ms-2 me-1">Submit a Project</a>
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
            <main className='pb-3'>
                <Outlet />
            </main>
        </div>
    );
}