import { ADDRESSES } from "@/constants";
import { RegisterForm } from "./RegisterForm";
import { NavLink } from "react-router-dom";
import { GoogleSignUpButton } from "./RegisterForm/components/GoogleSignUpButton";
import { LoginAccountButton } from "./RegisterForm/components/LoginAccountButton";
import styles from "./Register.module.scss";

/**
 * @function Register
 * Returns a jsx component containing the container for the Register form.
 * @returns
 */
export function Register() {
  const signInLink = ADDRESSES.AUTH.PATH + "/" + ADDRESSES.AUTH.SIGN_IN;
  const { 
      "register-container": registerContainer,
      "register-wrapper": registerWrapper,
      "register-left": registerLeft,
      "register-right": registerRight,
      "register-right-content": registerRightContent,
      "login-account-button": loginAccountButton,
      "register-left-content": registerLeftContent,
      "register-left-logo": registerLogo,
      "google-button": googleButton,
      } = styles;

  return (
    <section className={`bg-default-dark-purple ${registerContainer}`}>
      <div className={`${registerWrapper}`}>
          
        {/* left half here */}
        <div className={`${registerLeft}`}>
          <div className={`${registerLeftContent}`}>
            <img
              src="/lucso-logo-no-bg.png"
              alt="CSODS Logo"
              className={`img-fluid ${registerLogo}`}
            />
            <article className="bolder mb-2">CSO:DS</article>
            <article className="px-3 fs-responsive">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Curabitur eu mollis leo, at commodo turpis. 
              Quisque venenatis iaculis facilisis. 
              Donec tempor eu sem ut tincidunt.
            </article>
            <LoginAccountButton />
          </div>
        </div>

          {/* right half */}
          <div className={`${registerRight}`}>
            <div className={`${registerRightContent}`}>
              <div className="w-100 px-md-4 px-lg-5">
                <RegisterForm />
          
                <section className="d-flex d-md-none mt-3 justify-content-center">
                  <p className="m-0 p-0 color-light-2 small">
                    Already have an account?{" "}
                    <NavLink to={signInLink} className="text-decoration-none">
                      Sign In
                    </NavLink>
                  </p>
                </section>

                <div className="d-flex align-items-center my-1">
                  <hr className="flex-grow-1" />
                    <span className="mx-3 color-light-3 fs-responsive">OR</span>
                  <hr className="flex-grow-1" />
                </div>
              
                {/* Desktop Google Login */}
                <section className="d-flex mt-md-2 flex-column align-items-center">
                    <GoogleSignUpButton />
                </section>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
