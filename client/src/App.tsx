import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ADDRESSES } from "./constants";
import { CsodsBackground } from "./components";
import { LandingPage } from "./pages";
import { AuthGuards, AuthProvider, PersistAuth } from "./core/auth";
import { Pages as AuthPages, AuthNavBar } from "./features/auth";
import {
  Pages as ProjectsPages,
  Layouts as ProjectsLayouts,
} from "./features/projects";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<AuthProvider />}>
            <Route path={ADDRESSES.LANDING_PAGE} element={<CsodsBackground />}>
              <Route element={<AuthNavBar />}>
                <Route index element={<LandingPage />} />

                <Route path={ADDRESSES.AUTH.PATH}>
                  <Route
                    path={ADDRESSES.AUTH.REGISTER}
                    element={<AuthPages.Register />}
                  />
                  <Route
                    path={ADDRESSES.AUTH.SIGN_IN}
                    element={<AuthPages.SignIn />}
                  />
                  <Route
                    path={ADDRESSES.AUTH.UNAUTHORIZED}
                    element={<AuthPages.Unauthorized />}
                  />
                </Route>

                <Route element={<PersistAuth />}>
                  {/* <Route path={ADDRESSES.HOME} element={<HomePage />} /> */}
                  <Route path={ADDRESSES.ABOUT} />
                </Route>
              </Route>
              <Route element={<PersistAuth />}>
                <Route element={<AuthGuards.RequireAuth />}>
                  <Route
                    element={
                      <ProjectsLayouts.ProjectsNavBar navBarVariant={1} />
                    }
                  >
                    <Route
                      path={ADDRESSES.STUDENT_PROJECTS.PATH}
                      element={<ProjectsPages.StudentProjects />}
                    />
                  </Route>
                  <Route
                    element={
                      <ProjectsLayouts.ProjectsNavBar navBarVariant={2} />
                    }
                  >
                    <Route
                      path={ADDRESSES.PROJECT_DETAILS.PATH}
                      element={<ProjectsPages.ProjectDetails />}
                    />
                    <Route
                      path={ADDRESSES.SUBMIT_PROJECT}
                      element={<ProjectsPages.SubmitProject />}
                    />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
