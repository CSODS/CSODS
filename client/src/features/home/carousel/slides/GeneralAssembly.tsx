export function GeneralAssembly() {
    
  return (
    <section className="container-fluid d-flex p-lg-5 p-3 pb-md-5">
        <div className="container-md">
            <div className='row g-4 align-items-center justify-content-center'>
                
                {/* Text Content */}
                <div className="col-12 col-lg-6 text-center text-lg-start d-flex flex-column ">
                    <div className='col-lg-9 card-body mx-auto'>

                        <p className='text-muted mb-2'>
                            Upcoming Event
                        </p>

                        {/* Text md/lg screen */}
                        <div className='d-none d-md-block mb-3'>
                            <h3 className="color-dark-2 bolder mb-2">
                                CS GENERAL ASSEMBLY 2025
                            </h3>
                        
                            <small className="text-muted fst-italic d-block mb-1">
                                August 26, 2025 | 8:00 AM - 5:00 PM
                            </small>
                        </div>

                        {/* Mobile Image*/}
                        <div className='d-lg-none mb-2'>
                            <img src="/general_assembly_tarp.png" 
                                alt='CS General Assembly' 
                                className="img-fluid rounded-3" 
                                style={{maxHeight: "150px"}}>
                            </img>
                        </div>

                        {/* Text md/lg screen */}
                        <p className="d-none d-md-block mb-3 color-dark-1 px-lg-0 px-md-5 mb-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu mollis leo, at commodo turpis. Quisque venenatis iaculis facilisis. 
                        </p>

                        {/* View Details Button */}
                        <div className='mt-2'>
                            <button className="btn btn-dark-1 rounded-pill px-4">
                                <span className="small">View Details</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Desktop Image */}
                <div className='col-lg-6 d-none d-lg-flex justify-content-center'>
                    <img src='/general_assembly_tarp.png' 
                        alt='CS General Assembly' 
                        className="img-fluid rounded-3" 
                        style={{maxHeight: "300px"}}>
                    </img>
                </div>
            </div>
        </div>
    </section>
  );
}

export default GeneralAssembly;