import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ADDRESSES } from "./constants";
import { AuthProvider, CsodsBackground, NavBar } from "./components";
import LandingPage from "./features/landing/LandingPage";
import Home from "./features/home/Home";
import { StudentProjects, ProjectDetails } from "./features/projects";
import SubmitProject from "./features/submit-project/SubmitProject";
import { ProjectListLayout } from "./features/projects/pages/StudentProjects/layout/ProjectListLayout";
import { authComponents, authGuards } from "./features/auth";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<AuthProvider />}>
            <Route path={ADDRESSES.LANDING_PAGE} element={<CsodsBackground />}>
              <Route element={<NavBar />}>
                <Route index element={<LandingPage />} />

                <Route path={ADDRESSES.AUTH.PATH}>
                  <Route
                    path={ADDRESSES.AUTH.SIGN_IN}
                    element={<authComponents.SignIn />}
                  />
                  <Route
                    path={ADDRESSES.AUTH.UNAUTHORIZED}
                    element={<authComponents.Unauthorized />}
                  />
                </Route>

                <Route path={ADDRESSES.HOME} element={<Home />} />
                <Route path={ADDRESSES.ABOUT} />
              </Route>

              <Route element={<authGuards.RequireAuth />}>
                <Route element={<ProjectListLayout navBarVariant={1} />}>
                  <Route
                    path={ADDRESSES.STUDENT_PROJECTS.PATH}
                    element={<StudentProjects />}
                  />
                </Route>
                <Route element={<ProjectListLayout navBarVariant={2} />}>
                  <Route
                    path={ADDRESSES.PROJECT_DETAILS.PATH}
                    element={<ProjectDetails />}
                  />
                </Route>
              </Route>
            </Route>
            <Route
              path={ADDRESSES.SUBMIT_PROJECT}
              element={<SubmitProject />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
