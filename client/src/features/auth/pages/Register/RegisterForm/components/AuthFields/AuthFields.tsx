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
      {/* email */}
      <div className={`position-relative border border-1 ${groupForm}`}>
        <input
          type="email"
          id="email"
          ref={emailRef}
          className={`color-default-white pe-5 small ${controlForm} ${registerForm.email ? styles["not-empty"] : ""}`}
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
          <i className="bi bi-envelope-fill"></i>
        </span>
      </div>
      <p
        id="email-note"
        className={
          emailFocus && registerForm.email && !validEmail
            ? "text-start fs-small"
            : "visually-hidden"
        }
      >
        Max 254 characters <br />
        No starting dot (.) or consecutive dots (..) <br />
        Lowercase letters, numbers, ', ., +, _, - allowed before @ <br />
        Must end with a valid domain (e.g. example.com)
      </p>
      {/* username */}
      <div className={`position-relative border border-1 ${groupForm}`}>
        <input
          type="text"
          id="username"
          className={`color-default-white pe-5 small ${controlForm} ${registerForm.username ? styles["not-empty"] : ""}`}
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
          <i className="bi bi-person-fill"></i>
        </span>
      </div>
      <p
        id="user-note"
        className={
          userFocus && registerForm.username && !validUser
            ? "text-start fs-small"
            : "visually-hidden"
        }
      >
        4-24 characters <br />
        Must start with a letter <br />
        Letters, numbers, hyphens (-), and underscores (_) allowed
      </p>
      {/* password */}
      <div className={`position-relative border border-1 ${groupForm}`}>
        <input
          type="password"
          id="password"
          className={`color-default-white pe-5 small ${controlForm} ${registerForm.password ? styles["not-empty"] : ""}`}
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
          <i className="bi bi-lock-fill"></i>
        </span>
      </div>
      <div
        id="pwd-note"
        className={
          pwdFocus && registerForm.password && !validPwd
            ? "text-start fs-small"
            : "visually-hidden"
        }
      >
        8-24 characters <br />
        Must include: <br />
        <ul>
          <li>At least one uppercase letter</li>
          <li>At least one lowercase letter</li>
          <li>At least one number</li>
          <li>At least one number At least one special character: ! @ # $ %</li>
        </ul>
      </div>
      {/* confirm password */}
      <div className={`position-relative border border-1 ${groupForm}`}>
        <input
          type="password"
          id="passwordMatch"
          className={`color-default-white pe-5 small ${controlForm} ${registerForm.passwordMatch ? styles["not-empty"] : ""}`}
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
          <i className="bi bi-lock-fill"></i>
        </span>
      </div>
      <p
        id="pwd-match-note"
        className={
          matchFocus && !validMatch ? "text-start fs-small" : "visually-hidden"
        }
      >
        Must match the password input field.
      </p>
    </>
  );
}
