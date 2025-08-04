import { useLocation, Navigate, Outlet } from "react-router-dom";
import { ADDRESSES } from "@/constants";
import { useAlertInvalidSession, useAuth } from "../hooks";

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
  const isAuthenticated = !!auth;

  const normalizedRoles = allowedRoles ?? [];
  const allRolesAllowed = normalizedRoles.length === 0;
  //  if all roles are allowed, user is automatically authorized.
  const hasRequiredRoles =
    allRolesAllowed ||
    auth?.tokenPayload.userInfo.roles.some((role) =>
      normalizedRoles.includes(role)
    );

  const isAuthorized = isAuthenticated && hasRequiredRoles;

  const [alertInvalidSession] = useAlertInvalidSession();

  //  todo: add notification for invalid/expired session.
  return isAuthorized ? (
    <Outlet />
  ) : isAuthenticated ? (
    <Navigate to={unauthorizedPage} state={{ from: location }} replace />
  ) : alertInvalidSession ? (

    //  ! make this a bootstrap alert or something.
    <div className="alert alert-danger text-center" role="alert">
      <b>Invalid/Expired Session. </b>Please sign-in again.
      <button
        className="btn btn-close"
        aria-label="Close"
      ></button>
    </div>
  ) : (
    <Navigate to={signInPage} state={{ from: location }} replace />
  );
}
