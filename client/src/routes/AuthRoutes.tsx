import { Route } from "react-router-dom";
import { ADDRESSES } from "@/constants";
import { Pages as AuthPages } from "@/features/auth";

export function AuthRoutes() {
  return (
    <Route path={ADDRESSES.AUTH.PATH}>
      <Route path={ADDRESSES.AUTH.REGISTER} element={<AuthPages.Register />} />

      <Route path={ADDRESSES.AUTH.SIGN_IN} element={<AuthPages.SignIn />} />

      <Route
        path={ADDRESSES.AUTH.UNAUTHORIZED}
        element={<AuthPages.Unauthorized />}
      />
    </Route>
  );
}
