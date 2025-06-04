import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { PrimaryLayout } from './components/layouts/MainLayout';
import LandingPage from './components/pages/LandingPage';
import Home from "./components/pages/Home";
import { StudentProjects, ProjectDetails } from './components/pages/StudentProjects';
import SubmitProject from './components/pages/SubmitProject';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PrimaryLayout />}>
            <Route index element={<Home />} />
            {/* <Route path="/landing_page" element={<LandingPage />} /> */}
            <Route path="/home" element={<Home />} />
            <Route path="/student_projects" element={<StudentProjects />}/>
            <Route path='/student_projects/:id' element={<ProjectDetails />}/>
          </Route>
          <Route path="/submit_project" element={<SubmitProject />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
