export function GeneralAssembly() {
    
  return (
     <div className="container-fluid translucent-70 bg-light-1 p-5 d-flex">
      <div className="container-md d-flex flex-row">
        <div className='p-5 bg-transparent'>
            <div className='row g-4 align-items-center'>
        
                <div className='col-12 d-flex d-md-none d-flex justify-content-center'>
                    <img src="/general_assembly_tarp.png" alt='...' className="img-fluid rounded-5" style={{maxHeight: "300px"}}></img>
                </div>

                <div className='col-md-6'>
                    <div className='card-body d-flex flex-column'>
                        <div className='mt-4 mb-1 d-flex text-muted'>
                            Upcoming Event
                        </div>

                        <h5 className="card-title col-md-9 mt-1 mb-3 text-start fs-3 color-dark-2 bolder">CS GENERAL ASSEMBLY 2025</h5>
                        
                        <p className="card-text col-md-9 mt-1 mb-3 color-dark-1 text-start">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu mollis leo, at commodo turpis. Quisque venenatis iaculis facilisis. 
                        </p>

                        <div className='d-flex'>
                        <button className="px-3 py-2 btn btn-dark-1 rounded-pill py-2">
                            <span className="ms-3 me-1 fs-6 my-auto">View Details</span>
                        </button>
                        </div>
                    </div>
                    </div>

                    <div className='col-md-6 d-none d-md-flex justify-content-center'>
                    <img src='/general_assembly_tarp.png' alt='...' className="img-fluid rounded-5" style={{maxHeight: "300px"}}></img>
                </div>
            </div>
            </div>
        </div>
      </div>
  );
}

export default GeneralAssembly;