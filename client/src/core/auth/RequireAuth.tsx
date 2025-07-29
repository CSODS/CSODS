import { useLocation, Navigate, Outlet } from "react-router-dom";
import { ADDRESSES } from "@/constants";
import { useAuth } from "./hooks";

type RequireAuthProps = {
  allowedRoles?: string[];
};

export function RequireAuth({ allowedRoles }: RequireAuthProps) {
  const { AUTH } = ADDRESSES;
  const { PATH, SIGN_IN, UNAUTHORIZED } = AUTH;
  const signInPage = PATH + "/" + SIGN_IN; //  sign in path.
  const unauthorizedPage = PATH + "/" + UNAUTHORIZED; //  unauthorized path.

  const { auth } = useAuth();
  const location = useLocation();

  //  check if user is authenticated
  const isAuthenticated = auth !== undefined;

  const normalizedRoles = allowedRoles ?? [];
  const allRolesAllowed = normalizedRoles.length === 0;
  //  if all roles are allowed, user is automatically authorized.
  const hasRequiredRoles =
    allRolesAllowed ||
    auth?.tokenPayload.userInfo.roles.some((role) =>
      normalizedRoles.includes(role)
    );

  const isAuthorized = isAuthenticated && hasRequiredRoles;

  return isAuthorized ? (
    <Outlet />
  ) : isAuthenticated ? (
    <Navigate to={unauthorizedPage} state={{ from: location }} replace />
  ) : (
    <Navigate to={signInPage} state={{ from: location }} replace />
  );
}
