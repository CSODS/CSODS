import { useEffect, useRef } from "react";
import { SignInFormData } from "../../types";
import styles from "./SignInFields.module.scss";

type SignInFieldsProps = {
  signInForm: SignInFormData;
  onType: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * sign in fields
 * each field is a rounded pill div
 * @param param0
 * @returns
 */
export function SignInFields({ signInForm, onType }: SignInFieldsProps) {
  const identifierRef = useRef<HTMLInputElement>(null);
  const groupForm = styles["form-group-floating"];
  const controlForm = styles["form-control-floating"];


  useEffect(() => {
    if (identifierRef?.current) identifierRef.current.focus();
  }, []);

  return (
    <>
      <div className={`position-relative border border-1 ${groupForm}`}>
        <input
          type="text"
          id="identifier"
          ref={identifierRef}
          className={`color-default-white pe-5 fs-responsive ${controlForm} ${signInForm.identifier ? styles["not-empty"] : ""}`}
          autoComplete="off"
          onChange={(e) => onType(e)}
          value={signInForm.identifier}
          required
        />
        <label htmlFor="identifier">Email/Username</label>
        <span className="position-absolute top-50 end-0 translate-middle-y me-3">
          <i className="bi bi-envelope-fill"></i>
        </span>
      </div>

      <div className={`form-group-floating position-relative border border-1 ${groupForm}`}>
        <input
          type="password"
          id="password"
          className={`color-default-white pe-5 fs-responsive ${controlForm} ${signInForm.password ? styles["not-empty"] : ""}`}
          onChange={(e) => onType(e)}
          value={signInForm.password}
          required
        />
        <label htmlFor="password">Password</label>
        <span className="position-absolute top-50 end-0 translate-middle-y me-3">
          <i className="bi bi-lock-fill"></i>
        </span>
      </div>
    </>
  );
}
