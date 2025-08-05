import { ADDRESSES } from "@/constants";
import { SignInForm } from "./SignInForm";
import { NavLink } from "react-router-dom";
import styles from "./SignIn.module.scss";

export function SignIn() {
  const registerLink = ADDRESSES.AUTH.PATH + "/" + ADDRESSES.AUTH.REGISTER;
  const { 
    "login-container": loginContainer,
    "login-wrapper": loginWrapper,
    "login-left": loginLeft,
    "login-right": loginRight,
    "create-account-button": createAccount, 
    } = styles;

  return (
    <section className={`mt-2 px-2 bg-default-dark-purple ${loginContainer}`}>
      <div className={`${loginWrapper}`}>

        {/* 1st half */}
        <div className={`${loginLeft}`}>
          <img
            src="/lucso-logo-no-bg.png"
            alt="CSODS Logo"
            className="img-fluid mb-3"
            style={{ maxWidth: "150px" }}
          />

          <h1 className="bolder">
            CSODS
          </h1>

          <p className="text-justify px-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Curabitur eu mollis leo, at commodo turpis. 
            Quisque venenatis iaculis facilisis. 
            Donec tempor eu sem ut tincidunt.
          </p>
          
          <button
            className={`${createAccount}`}
            onClick={() => window.location.href = ADDRESSES.AUTH.REGISTER}
          >
            CREATE ACCOUNT
          </button>

        </div>

        {/* 2nd half */}
        <div className={`${loginRight}`}>
          <div>
            <SignInForm />
            <section className="mt-3 text-center">
              <p className="m-0 p-0 color-light-2 small">
                Don't have an account?{" "}
                <NavLink
                  to={registerLink}
                  className="text-decoration-none"
                >
                  Sign Up
                </NavLink>
              </p>
            </section>
          </div>
        </div>

      </div>    
    </section>
  );
}
