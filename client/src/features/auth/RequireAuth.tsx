import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks";
import { ADDRESSES } from "@/constants";

export function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();
  const { AUTH } = ADDRESSES;
  const { PATH, SIGN_IN } = AUTH;
  const signInPage = PATH + "/" + SIGN_IN;

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to={signInPage} state={{ from: location }} replace />
  );
}
