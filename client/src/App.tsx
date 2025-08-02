import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ADDRESSES } from "./constants";
import { CsodsBackground } from "./components";
import { AuthProvider } from "./core/auth";
import { AuthNavBar } from "./features/auth";
import { LandingPage } from "./features/LandingPage";
import { AuthRoutes, HomeRoutes, ProjectsRoutes } from "./routes";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<AuthProvider />}>
            <Route path={ADDRESSES.LANDING_PAGE} element={<CsodsBackground />}>
              <Route element={<AuthNavBar />}>
                <Route index element={<LandingPage />} />

                {/* Auth related pages */}
                {AuthRoutes()}

                {/* Miscellaneous pages: Home, Landing page, etc. */}
                {HomeRoutes()}
              </Route>

              {/* Projects feature pages */}
              {ProjectsRoutes()}
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
