import './assets/stylesheets/App.css';
import './assets/stylesheets/cards.css';
import './assets/stylesheets/colors.css';
import './assets/stylesheets/buttons.css';
import './assets/stylesheets/borders.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { ADDRESSES } from '@/constants';
import { CsodsBackground, NavBar } from '@/components';
import LandingPage from './features/landing/LandingPage';
import Home from "./features/home/Home";
import StudentProjects from './features/project-list/StudentProjects';
import ProjectDetails from './features/project-details/ProjectDetails';
import SubmitProject from './features/submit-project/SubmitProject';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={ADDRESSES.LANDING_PAGE} element={<CsodsBackground />}>
            <Route element={<NavBar/>}>
              <Route index element={<LandingPage />} />
              <Route path={ADDRESSES.HOME} element={<Home />} />
              <Route path={ADDRESSES.STUDENT_PROJECTS.PATH} element={<StudentProjects />}/>
              <Route path={ADDRESSES.ABOUT} />
              <Route path={ADDRESSES.PROJECT_DETAILS.PATH} element={<ProjectDetails />}/>
            </Route>
          </Route>
          <Route path={ADDRESSES.SUBMIT_PROJECT} element={<SubmitProject />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
