import { useEffect, useRef } from "react";
import { RegisterFieldsProps } from "../../types";
import { useAuthFocus } from "./useAuthFocus";
import { useAuthValidation } from "./useAuthValidation";
import styles from "./AuthFields.module.scss";

// todo: add visual cues for valid/invalid inputs
// todo: better design for input notes(?)
export function AuthFields({ registerForm, onType }: RegisterFieldsProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const groupForm = styles["form-group-floating"];
  const controlForm = styles["form-control-floating"];
  const authGrid = styles["auth-grid"];

  //  use these for the visual cues
  const { validEmail, validUser, validPwd, validMatch } =
    useAuthValidation(registerForm);

  const {
    emailFocus,
    setEmailFocus,
    userFocus,
    setUserFocus,
    pwdFocus,
    setPwdFocus,
    matchFocus,
    setMatchFocus,
  } = useAuthFocus();

  useEffect(() => {
    if (emailRef?.current) emailRef.current.focus();
  }, []);

  return (
    <>
    <div className={`${authGrid}`}>
      {/* email */}
      <div
        className={`position-relative border border-1 ${groupForm} 
      ${validEmail ? styles.valid : registerForm.email ? styles.invalid : ""}`}
      >
        <input
          type="email"
          id="email"
          ref={emailRef}
          className={`color-default-white pe-5 fs-responsive ${controlForm} ${
            registerForm.email ? styles["not-empty"] : ""
          }`}
          autoComplete="off"
          onChange={(e) => onType(e)}
          value={registerForm.email}
          required
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="email-note"
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <label htmlFor="email">Email</label>
        <span className="position-absolute top-50 end-0 translate-middle-y me-3">
          <i
            className={`${
              validEmail
                ? "bi bi-envelope-check-fill text-success"
                : registerForm.email
                ? "bi bi-envelope-exclamation-fill text-danger"
                : "bi bi-envelope-fill"
            }`}
          ></i>
        </span>
      </div>
      
      {/* username */}
      <div
        className={`position-relative border border-1 ${groupForm}
      ${
        validUser ? styles.valid : registerForm.username ? styles.invalid : ""
      }`}
      >
        <input
          type="text"
          id="username"
          className={`color-default-white pe-5 fs-responsive ${controlForm} ${
            registerForm.username ? styles["not-empty"] : ""
          }`}
          autoComplete="off"
          onChange={(e) => onType(e)}
          value={registerForm.username}
          required
          aria-invalid={validUser ? "false" : "true"}
          aria-describedby="user-note"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <label htmlFor="username">Username</label>
        <span className="position-absolute top-50 end-0 translate-middle-y me-3">
          <i
            className={`${
              validUser
                ? "bi bi-person-fill-check text-success"
                : registerForm.username
                ? "bi bi-person-fill-x text-danger"
                : "bi bi-person-fill"
            }`}
          ></i>
        </span>
      </div>
      
      {/* password */}
      <div
        className={`position-relative border border-1 ${groupForm} 
      ${validPwd ? styles.valid : registerForm.password ? styles.invalid : ""}`}
      >
        <input
          type="password"
          id="password"
          className={`color-default-white pe-5 fs-responsive ${controlForm} ${
            registerForm.password ? styles["not-empty"] : ""
          }`}
          onChange={(e) => onType(e)}
          value={registerForm.password}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwd-note"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <label htmlFor="password">Password</label>
        <span className="position-absolute top-50 end-0 translate-middle-y me-3">
          <i
            className={`${
              validPwd
                ? "bi bi-check text-success"
                : registerForm.password
                ? "bi bi-exclamation text-danger"
                : "bi bi-lock-fill"
            }`}
          ></i>
        </span>
      </div>

      {/* confirm password */}
      <div
        className={`position-relative border border-1 ${groupForm} 
      ${
        registerForm.password && validMatch
          ? styles.valid
          : registerForm.passwordMatch
          ? styles.invalid
          : ""
      }`}
      >
        <input
          type="password"
          id="passwordMatch"
          className={`color-default-white pe-5 fs-responsive ${controlForm} ${
            registerForm.passwordMatch ? styles["not-empty"] : ""
          }`}
          onChange={(e) => onType(e)}
          value={registerForm.passwordMatch}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirm-note"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <label htmlFor="passwordMatch">Confirm Password</label>
        <span className="position-absolute top-50 end-0 translate-middle-y me-3">
          <i
            className={`${
              registerForm.password && validMatch
                ? "bi bi-check-all text-success"
                : registerForm.passwordMatch
                ? "bi bi-exclamation text-danger"
                : "bi bi-lock-fill"
            }`}
          ></i>
        </span>
      </div>
    </div>

    <div
      id="email-note"
      className={`mb-0 pb-0 ${
      emailFocus && !validEmail
        ? "text-start fs-small"
        : "visually-hidden"
      }`}
    >
    <ul className="mb-0 pb-0">
        <li>Max 254 characters</li>
        <li>No starting dot (.) or consecutive dots (..)</li>
        <li>Lowercase letters, numbers, ', ., +, _, - allowed before @</li>
        <li>Must end with a valid domain (e.g. example.com)</li>
      </ul>
    </div>

    <div
      id="user-note"
      className={`mb-0 pb-0 ${
        userFocus && !validUser
          ? "text-start fs-small"
          : "visually-hidden"
        }`}>
      <ul className="mb-0 pb-0">
        <li>4-24 characters</li>
        <li>Must start with a letter</li>
        <li>Letters, numbers, hyphens (-), and underscores (_) allowed</li>
      </ul>
    </div>
    
    <div
      id="pwd-note"
      className={
        pwdFocus && !validPwd
          ? "text-start fs-small"
          : "visually-hidden"
        }
      >

      <span className="ms-2">
        Password must be 8 – 24 characters and include:
      </span>

      <ul className="mb-0 pb-0">
        <li>At least one uppercase letter</li>
        <li>At least one lowercase letter</li>
        <li>At least one number</li>
        <li>At least one special character<i> (e.g.: ! @ # $ % )</i></li>
      </ul>
    </div>

    <div
      id="pwd-match-note"
      className={
        matchFocus && registerForm.passwordMatch && !validMatch ? "text-start fs-small" : "visually-hidden"
      }
    >
      <ul className="mb-0 pb-0">
        <li>Must match the password input field.</li>
      </ul>
    </div>
    
    </>
  );
}
