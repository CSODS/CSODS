export function GeneralAssemblyV2() {
    
  return (
    <div className="container-fluid d-flex p-lg-5 p-2">
        <div className="container-lg d-flex flex-row">
            <div className='p-lg-5 p-2 bg-transparent'>
                <div className='row g-4 align-items-center'>
            
                    <div className='col-12 d-lg-none d-flex justify-content-center'>
                        <img src="/general_assembly_tarp.png" alt='...' className="img-fluid rounded-3" style={{maxHeight: "200px"}}></img>
                    </div>

                    <div className="col-12 col-md-12 col-lg-6">
                        <div className='card-body d-flex flex-column align-content-center'>
                            <div className='col-lg-9 my-1 text-start text-muted align-self-center'>
                                Upcoming Event
                            </div>

                            <h3 className="card-title col-lg-9 my-1 text-center text-lg-start color-dark-2 bolder mx-auto">
                                CS GENERAL ASSEMBLY 2025
                            </h3>

                            <div className="card-text col-lg-9 mb-3 d-none d-md-block color-dark-1 text-lg-start align-self-center">
                                <i className="color-muted" style={{fontSize: "0.8rem"}}>
                                    August 26, 2025 | 8:00 AM - 5:00 PM
                                </i>
                                <p className="mt-2">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu mollis leo, at commodo turpis. Quisque venenatis iaculis facilisis. 
                                </p>
                            </div>

                            <div className='col-lg-9 d-lg-flex align-self-center'>
                                <button className="px-3 py-2 btn btn-dark-1 rounded-pill py-2">
                                    <span className="mx-3 fs-6 my-auto">View Details</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-6 d-none d-lg-flex justify-content-center'>
                        <img src='/general_assembly_tarp.png' alt='...' className="img-fluid rounded-3" style={{maxHeight: "300px"}}></img>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default GeneralAssemblyV2;