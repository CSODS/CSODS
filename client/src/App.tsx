import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ADDRESSES } from "./constants";
import { CsodsBackground, NavBar } from "./components";
import { Home, LandingPage } from "./pages";
import { AuthGuards, AuthProvider } from "./core/auth";
import { Pages as AuthPages } from "./features/auth";
import { Pages as ProjectsPages } from "./features/projects";

function App() {
  const { Layouts: ProjectsLayouts } = ProjectsPages;
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
                    element={<AuthPages.SignIn />}
                  />
                  <Route
                    path={ADDRESSES.AUTH.UNAUTHORIZED}
                    element={<AuthPages.Unauthorized />}
                  />
                </Route>

                <Route path={ADDRESSES.HOME} element={<Home />} />
                <Route path={ADDRESSES.ABOUT} />
              </Route>

              <Route element={<AuthGuards.RequireAuth />}>
                <Route
                  element={
                    <ProjectsLayouts.ProjectListLayout navBarVariant={1} />
                  }
                >
                  <Route
                    path={ADDRESSES.STUDENT_PROJECTS.PATH}
                    element={<ProjectsPages.StudentProjects />}
                  />
                </Route>
                <Route
                  element={
                    <ProjectsLayouts.ProjectListLayout navBarVariant={2} />
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
