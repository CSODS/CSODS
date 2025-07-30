import React, { useState } from 'react';

export function FAB() {
  const [isOpen, setIsOpen] = useState(false);

  const buttonGroup: React.CSSProperties = {
    opacity: isOpen? 1 : 0,
    transform: isOpen? "translateY(0)" : "translateY(20px)",          
    transition: "all 0.3s ease-in-out", 
    pointerEvents: isOpen ? "auto" : "none"
  };

  const fabButton: React.CSSProperties = {
    width: '56px', 
    height: '56px', 
    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", 
    transition: "transform 0.4s ease" 
  };
  
  return (
    
    <div className="position-fixed bottom-0 start-0 m-5 z-3 d-none d-sm-block" style={{ height: 'auto' }}>
      <div 
        className="d-flex flex-column gap-2 align-items-center mb-3"
        style={ buttonGroup }>

        <button className="btn btn-dark-4 rounded-circle border-0 shadow">
          <i className="bi bi-person-circle fs-3" />
        </button>
        <button className="btn btn-dark-4 rounded-circle border-0 shadow">
          <i className="bi bi-handbag-fill fs-3" />
        </button>
        <button className="btn btn-dark-4 rounded-circle border-0 shadow">
          <i className="bi bi-calendar fs-3" />
        </button>

      </div>

      <button 
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
          className={`btn rounded-circle border-3 d-flex justify-content-center align-items-center shadow ${isOpen ? "btn-dark-2" : "btn-light-2"}`}
          style={ fabButton }>
              
          <i className={`bi bi-three-dots ${isOpen ? "fs-6" : "fs-3"} `} />
      </button>
    </div>
  );
}

export default FAB;
