import { ADDRESSES } from "@/constants";
import { SignInForm } from "./SignInForm";
import { NavLink } from "react-router-dom";

export function SignIn() {
  const registerLink = ADDRESSES.AUTH.PATH + "/" + ADDRESSES.AUTH.REGISTER;

  return (
    <section>
      <section className="card-dark-purple border border-1 border-white rounded-3">
        <SignInForm />
        <NavLink to={registerLink}>Create Account</NavLink>
      </section>
    </section>
  );
}
