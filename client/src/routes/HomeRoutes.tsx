import { Route } from "react-router-dom";
import { ADDRESSES } from "@/constants";
import { PersistAuth } from "@/core/auth";
import { HomePage } from "@/features/HomePage";

export function HomeRoutes() {
  return (
    <>
      <Route element={<PersistAuth />}>
        <Route path={ADDRESSES.HOME} element={<HomePage />} />
        <Route path={ADDRESSES.ABOUT} />
      </Route>
    </>
  );
}
