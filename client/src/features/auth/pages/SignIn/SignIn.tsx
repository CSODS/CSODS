import { ADDRESSES } from "@/constants";
import { SignInForm } from "./SignInForm";
import { NavLink } from "react-router-dom";
import { GoogleSignInButton } from "./SignInForm/components/GoogleSignInButton";
import { ForgotPassword } from "./SignInForm/components/ForgotPassword";
import styles from "./SignIn.module.scss";

export function SignIn() {
  const registerLink = ADDRESSES.AUTH.PATH + "/" + ADDRESSES.AUTH.REGISTER;
  const { 
    "login-container": loginContainer,
    "login-wrapper": loginWrapper,
    "login-left": loginLeft,
    "login-right": loginRight,
    "login-right-content": loginRightContent,
    "create-account-button": createAccountButton,
    "login-left-content": loginLeftContent,
    "login-left-logo": loginLogo,
    "google-button": googleButton,
    } = styles;

  return (
    <section className={`bg-default-dark-purple ${loginContainer}`}>
      <div className={`${loginWrapper}`}>

        {/* 1st half */}
        <div className={`${loginLeft}`}>
          <div className={`${loginLeftContent}`}>
            <img
              src="/lucso-logo-no-bg.png"
              alt="CSODS Logo"
              className={`img-fluid ${loginLogo}`}
            />
            <article className="bolder mb-2">CSO:DS</article>
            <article className="px-3 fs-responsive">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Curabitur eu mollis leo, at commodo turpis. 
              Quisque venenatis iaculis facilisis. 
              Donec tempor eu sem ut tincidunt.
            </article>
          </div>
        </div>

        {/* 2nd half */}
        <div className={`${loginRight}`}>
          <div className={`${loginRightContent}`}>
            <div className="w-100 px-md-4 px-lg-5">
              <SignInForm />

              {/* Mobile Sign Up Link */}
              <section className="d-flex d-md-none mt-3 justify-content-center">
                <p className="m-0 p-0 color-light-2 small">
                  Don't have an account?{" "}
                  <NavLink to={registerLink} className="text-decoration-none">
                    Sign Up
                  </NavLink>
                </p>
              </section>

              <div className="d-flex align-items-center my-1">
                <hr className="flex-grow-1" />
                  <span className="mx-3 color-light-3 fs-responsive">OR</span>
                <hr className="flex-grow-1" />
              </div>
              
              {/* Desktop Google Login + Forgot Password */}
              <section className="d-flex mt-md-2 flex-column align-items-center">
                  <GoogleSignInButton />
                  <ForgotPassword />
              </section>

            </div>
          </div>
        </div>

      </div>    
    </section>
  );
}
