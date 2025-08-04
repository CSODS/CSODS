import { ReactNode } from "react";
import { Route } from "react-router-dom";
import { PersistAuth } from "./PersistAuth";
import { RequireAuth } from "./RequireAuth";

export function getProtectedRoutes(children: ReactNode) {
  return (
    <>
      <Route element={<PersistAuth />}>
        <Route element={<RequireAuth />}>{children}</Route>
      </Route>
    </>
  );
}
