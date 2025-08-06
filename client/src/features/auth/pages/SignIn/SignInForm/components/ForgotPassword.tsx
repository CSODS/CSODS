import { NavLink } from "react-router-dom";

export function ForgotPassword() {
  return (
    <p className="mt-3 small text-center">
        <NavLink to={"/"} className="text-decoration-none hover-color-light-3 hover color-light-2">
            Forgot Password?
        </NavLink>
    </p>
  );
}