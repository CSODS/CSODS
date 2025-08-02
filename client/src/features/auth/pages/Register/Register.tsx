import { ADDRESSES } from "@/constants";
import { NavLink } from "react-router-dom";
import styles from "./Register.module.scss";
import { RegisterForm } from "./RegisterForm";

/**
 * @function Register
 * Returns a jsx component containing the container for the Register form.
 * @returns
 */
export function Register() {
  const signInLink = ADDRESSES.AUTH.PATH + "/" + ADDRESSES.AUTH.SIGN_IN;
  const registerContainer = styles["register-container"];

  return (
    <section
      className={`mt-2 px-2 h-100 bg-default-dark-purple ${registerContainer}`}
    >
      {/* left half here */}

      {/* right half */}
      <section className="">
        <RegisterForm />
        <NavLink to={signInLink}>Sign In</NavLink>
      </section>
    </section>
  );
}
