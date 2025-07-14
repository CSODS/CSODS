import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ADDRESSES } from "@/constants";
import { ReactNode, useState } from "react";
import { IProjectSearchParameters } from "@/types";
import { getPageLink } from "../utils";

export function ProjectListLayout() {
    return (
        <div>
            <NavBar>
                <SearchBar/>
            </NavBar>
            <main className='pb-3'>
                <Outlet />
            </main>
        </div>
    );
}

interface NavBarProps {
    children?: ReactNode;
}

function NavBar({ children }: NavBarProps) {
    const projectsFirstPage = `${ADDRESSES.STUDENT_PROJECTS.ROOT}/1`;

    return (
        <div className="p-0 navbar navbar-expand-lg">    
            <div className="px-md-3 px-1 py-0 container-fluid bg-dark-3 translucent-100">
                <NavLink className=" m-0 me-md-1 my-1 d-flex flex-row justify-content-center align-items-center text-decoration-none color-light-1" to={ADDRESSES.LANDING_PAGE}>
                    <img src='/lucso-logo-no-bg.png' alt="CSO_LOGO" className='header-logo'/>
                    <p className='m-0 p-0 ps-2 d-lg-block d-none fs-4 bolder'>
                        CSO:DS
                    </p>  
                </NavLink>
                {children}
                <button className="mx-1 p-1 navbar-toggler bg-transparent border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="bi bi-list fs-1 color-light-1"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbar">
                    <div className="navbar-nav d-none d-lg-flex gap-2 position-absolute top-50 start-50 translate-middle">
                        <NavLink to={ADDRESSES.HOME} className="mx-2 header-nav-element">Home</NavLink>
                        <NavLink to={projectsFirstPage} className="mx-2 header-nav-element">Projects</NavLink>
                        <NavLink to={ADDRESSES.ABOUT} className="mx-2 header-nav-element">About</NavLink>
                    </div>
                    <NavLink to={ADDRESSES.SUBMIT_PROJECT} className="ms-auto me-2 px-2 py-1 nav-link d-none d-lg-flex btn btn-neutral-1 hover-lighten rounded-pill">
                        <div className="nav-link ms-2 me-1">Submit a Project</div>
                        <i className="bi bi-arrow-right-circle ms-2 me-1"></i>
                    </NavLink>
                    
                    <div className="navbar-nav d-flex d-lg-none flex-column rounded-2">
                        <NavLink to={ADDRESSES.HOME} className="nav-link color-light-2">Home</NavLink>
                        <NavLink to={projectsFirstPage} className="nav-link color-light-2">Projects</NavLink>
                        <NavLink to={ADDRESSES.ABOUT} className="nav-link color-light-2">About</NavLink>
                        <NavLink to={ADDRESSES.SUBMIT_PROJECT} className="nav-link color-light-2">Submit a Project</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SearchBar() {
    const [searchString, setSearchString] = useState<string>('');

    const handleType = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(evt.target.value);
    }

    const navigate = useNavigate();
    const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (evt.key === 'Enter') {
        let searchParameters: IProjectSearchParameters = {};
        if (searchString.trim() !== '') {
            searchParameters.projectTitle = searchString;
        }
        const link = getPageLink(1, searchParameters);
        navigate(link);
        return;
        }
    }

  return(
    <div className="ms-1 me-auto col-md-5 col-sm-6 col d-lg-none d-flex">
        <div className='w-100 d-flex align-items-center justify-content-center bg-light-1 translucent-30 rounded-1'>
            <input type='text' className='mx-1 my-1 w-100 fs-6 color-light-1' value={searchString} onChange={handleType} onKeyDown={handleKeyDown}/>
            <div className="px-2 h-100 d-flex justify-content-center align-items-center bg-dark-3 translucent-70 rounded-end-1">
                <i className="px-1 bi bi-search color-light-1"/>
            </div>
        </div>
    </div>
  )
}