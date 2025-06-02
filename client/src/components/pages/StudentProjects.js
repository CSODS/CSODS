import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE, ENDPOINTS } from '../../constants/constants.js';

function StudentProjects() {
//   const [projectList, setProjectList] = useState([]);
//   useEffect(() => {
//     axios.get(`${BASE+ENDPOINTS.PROJECTS}`).then((response) => {
//       // do something
//       setProjectList(response.data);
//     })
//   }, []);

  return (
    <div>
        <div className='p-0'>
          <h1 className='fs-1 bolder color-celeste'>GitHub Projects</h1>
        </div>
      {
        // projectList.map((value, key) =>  {
        //   //  display data
        //   return <div> {value.ProjectName} {value.ProjectOwner} </div>
        // })
      }
    </div>  
  );
}

export default StudentProjects;