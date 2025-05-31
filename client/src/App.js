// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
//  run a function immediately when page renders
import { useEffect, useState } from 'react';

import { BASE, ENDPOINTS } from './constants/constants.js';

function App() {
  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    axios.get(`${BASE+ENDPOINTS.PROJECTS}`).then((response) => {
      // do something
      setProjectList(response.data);
    })
  }, [])

  return (
    <div className="App">
      {
        projectList.map((value, key) =>  {
          //  display data
          return <div> {value.ProjectName} {value.ProjectOwner} </div>
        })
      }
    </div>
  );
}

export default App;
