import { useEffect, useRef } from "react";
import { SignInFormData } from "../../types";

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

  useEffect(() => {
    if (identifierRef?.current) identifierRef.current.focus();
  }, []);
  return (
    <>
      <div className="m-0 px-3 py-2 row border border-1 rounded-pill">
        <input
          type="text"
          id="identifier"
          ref={identifierRef}
          placeholder="Email/Username"
          className="m-0 p-0 color-default-white fs-6"
          autoComplete="off"
          onChange={(e) => onType(e)}
          value={signInForm.identifier}
          required
        />
      </div>
      <div className="m-0 px-3 py-2 row border border-1 rounded-pill">
        <input
          type="password"
          id="password"
          className="m-0 p-0 color-default-white fs-6"
          placeholder="Password"
          onChange={(e) => onType(e)}
          value={signInForm.password}
          required
        />
      </div>
    </>
  );
}
