import '../App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { ADDRESSES } from './constants/constants.js';
import { PrimaryLayout } from './components/layouts/MainLayout.js';
import LandingPage from './components/pages/LandingPage.js';
import Home from "./components/pages/Home.js";
import StudentProjects from './components/pages/StudentProjects.js';
import ProjectDetails from './components/pages/ProjectDetails';
import SubmitProject from './components/pages/SubmitProject.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={ADDRESSES.LANDING_PAGE} element={<PrimaryLayout />}>
            <Route index element={<LandingPage />} />
            <Route path={ADDRESSES.HOME} element={<Home />} />
            <Route path={ADDRESSES.STUDENT_PROJECTS} element={<StudentProjects />}/>
            <Route path={ADDRESSES.PROJECT_DETAILS} element={<ProjectDetails />}/>
            <Route path={ADDRESSES.ABOUT} />
          </Route>
          <Route path={ADDRESSES.SUBMIT_PROJECT} element={<SubmitProject />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
