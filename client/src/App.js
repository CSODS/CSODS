import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import LandingPage from './components/pages/LandingPage';
import Home from "./components/pages/Home";
import StudentProjects from './components/pages/StudentProjects';
import SubmitProject from './components/pages/SubmitProject';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="/landing_page" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/student_projects" element={<StudentProjects />} />
          </Route>
          <Route path="/submit_project" element={<SubmitProject />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
