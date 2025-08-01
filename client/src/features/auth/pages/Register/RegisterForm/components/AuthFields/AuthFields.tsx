import { useEffect, useRef } from "react";
import { RegisterFieldsProps } from "../../types";
import { useAuthFocus } from "./useAuthFocus";
import { useAuthValidation } from "./useAuthValidation";

// todo: add visual cues for valid/invalid inputs
export function AuthFields({ registerForm, onType }: RegisterFieldsProps) {
  const emailRef = useRef<HTMLInputElement>(null);

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
      <div className="m-0 px-3 py-2 row border border-1 rounded-pill">
        <input
          type="email"
          id="email"
          ref={emailRef}
          placeholder="Email"
          className="m-0 p-0 color-default-white fs-6"
          autoComplete="off"
          onChange={(e) => onType(e)}
          required
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="email-note"
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
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
      <div className="m-0 px-3 py-2 row border border-1 rounded-pill">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="m-0 p-0 color-default-white fs-6"
          autoComplete="off"
          onChange={(e) => onType(e)}
          required
          aria-invalid={validUser ? "false" : "true"}
          aria-describedby="user-note"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
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
      <div className="m-0 px-3 py-2 row border border-1 rounded-pill">
        <input
          type="password"
          id="password"
          className="m-0 p-0 color-default-white fs-6"
          placeholder="Password"
          onChange={(e) => onType(e)}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwd-note"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
      </div>
      <p
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
      </p>
      {/* confirm password */}
      <div className="m-0 px-3 py-2 row border border-1 rounded-pill">
        <input
          type="password"
          id="passwordMatch"
          className="m-0 p-0 color-default-white fs-6"
          placeholder="Confirm Password"
          onChange={(e) => onType(e)}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirm-note"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
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
