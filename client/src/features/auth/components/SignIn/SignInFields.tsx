import { useEffect, useRef } from "react";
import { SignInFormData } from "./types";

type SignInFieldsProps = {
  signInForm: SignInFormData;
  onType: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SignInFields({ signInForm, onType }: SignInFieldsProps) {
  const identifierRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (identifierRef?.current) identifierRef.current.focus();
  }, []);
  return (
    <>
      <input
        type="text"
        id="identifier"
        ref={identifierRef}
        placeholder="Email/Username"
        className="m-0 p-0 row border color-default-white"
        autoComplete="off"
        onChange={(e) => onType(e)}
        value={signInForm.identifier}
        required
      />
      <input
        type="password"
        id="password"
        className="m-0 p-0 row border color-black"
        onChange={(e) => onType(e)}
        value={signInForm.password}
        required
      />
    </>
  );
}
