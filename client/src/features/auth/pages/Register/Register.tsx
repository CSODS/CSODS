import { ADDRESSES } from "@/constants";
import { RegisterForm } from "./RegisterForm";
import { NavLink } from "react-router-dom";
import styles from "./Register.module.scss";

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
      </section>
      <section className="mt-3 text-center">
        <p className="m-0 p-0 color-light-2 small">
          Already have an account?{" "}
          <NavLink
            to={signInLink}
            className="text-decoration-none"
          >
            Sign In
          </NavLink>
        </p>
      </section>
    </section>
  );
}
