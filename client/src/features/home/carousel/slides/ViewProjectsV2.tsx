import { ADDRESSES } from "@/constants";

export function ViewProjectsV2() {
    const projectsFirstPage = `${ADDRESSES.STUDENT_PROJECTS.ROOT}/1`;
    return (
        <div className="container-fluid p-5 d-flex">
            <div className="container-md d-flex flex-row">
                <div className='p-5 bg-transparent'>
                    <div className='row g-4 align-items-center'>
                
                        <div className='col-12 d-flex d-md-none d-flex justify-content-center'>
                            <img src="/homepage_img.png" alt='...' className="img-fluid rounded-5" style={{maxHeight: "300px"}}></img>
                        </div>

                        <div className='col-md-6'>
                            <div className='card-body d-flex flex-column'>
                                <div className='mb-1 p-0 d-flex'>
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
                            <img src='/homepage_img.png' alt='...' className="img-fluid rounded-5" style={{maxHeight: "300px"}}></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProjectsV2;