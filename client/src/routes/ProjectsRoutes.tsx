import { Route } from "react-router-dom";
import { ADDRESSES } from "@/constants";
import { AuthGuards } from "@/core/auth";
import {
  Layouts as ProjectsLayouts,
  Pages as ProjectsPages,
} from "@/features/projects";

export function ProjectsRoutes() {
  return (
    <>
      <Route element={<AuthGuards.PersistAuth />}>
        <Route element={<AuthGuards.RequireAuth />}>
          <Route element={<ProjectsLayouts.ProjectsNavBar navBarVariant={1} />}>
            <Route
              path={ADDRESSES.STUDENT_PROJECTS.PATH}
              element={<ProjectsPages.StudentProjects />}
            />
          </Route>

          <Route element={<ProjectsLayouts.ProjectsNavBar navBarVariant={2} />}>
            <Route
              path={ADDRESSES.PROJECT_DETAILS.PATH}
              element={<ProjectsPages.ProjectDetails />}
            />
          </Route>
        </Route>
      </Route>
    </>
  );
}
