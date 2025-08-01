import { ADDRESSES } from "@/constants";
import { SignInForm } from "./SignInForm";
import { NavLink } from "react-router-dom";
import styles from "./SignIn.module.scss";

export function SignIn() {
  const registerLink = ADDRESSES.AUTH.PATH + "/" + ADDRESSES.AUTH.REGISTER;
  const loginContainer = styles["login-container"];

  return (
    <section
      className={`mt-2 px-2 h-100 bg-default-dark-purple ${loginContainer}`}
    >
      {/* 1st half here */}
      {/* 2nd half */}
      <section className="">
        <SignInForm />
        <NavLink to={registerLink}>Create Account</NavLink>
      </section>
    </section>
  );
}
