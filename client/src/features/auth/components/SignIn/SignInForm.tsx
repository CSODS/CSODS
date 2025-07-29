import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthHooks } from "@/core/auth";
import { useSignInForm } from "./hooks";
import { handleSignIn } from "./utils";
import { ErrorMessage } from "./ErrorMessage";
import { SignInFields } from "./SignInFields";
import { SignInButton } from "./SignInButton";

export function SignInForm() {
  const { setAuth } = AuthHooks.useAuth();
  const errRef = useRef<HTMLParagraphElement>(null);

  const { signInForm, onType, errMsg, setErrMsg } = useSignInForm();

  useEffect(() => {
    setErrMsg("");
  }, [setErrMsg, signInForm.identifier, signInForm.password]);

  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSignIn(signInForm, setErrMsg, setAuth, navigate, location);
  };

  return (
    <article className="p-0">
      <ErrorMessage message={errMsg} errRef={errRef} />

      <p className="m-0 p-0 px-3 text-center fs-1 fw-bold">Welcome</p>

      <form
        className="m-0 mt-4 p-0 px-3 d-grid row-gap-4"
        onSubmit={handleSubmit}
      >
        <SignInFields signInForm={signInForm} onType={onType} />
        <SignInButton />
      </form>
    </article>
  );
}
