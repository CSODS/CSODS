import { useEffect, useRef } from "react";
import { useAuth } from "../../hooks";
import { useSignInForm } from "./hooks";
import { handleSignIn } from "./utils";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "./ErrorMessage";
import { SignInFields } from "./SignInFields";

export function SignInForm() {
  const { setAuth } = useAuth();

  const errRef = useRef<HTMLParagraphElement>(null);

  const { signInForm, onType, errMsg, setErrMsg } = useSignInForm();

  useEffect(() => {
    setErrMsg("");
  }, [signInForm.identifier, signInForm.password]);

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSignIn(signInForm, setErrMsg, setAuth, navigate);
  };

  return (
    <article className="p-0">
      <ErrorMessage message={errMsg} errRef={errRef} />

      <h1 className="m-0 p-0 text-center">Welcome</h1>

      <form className="m-0 p-0 row" onSubmit={handleSubmit}>
        <SignInFields signInForm={signInForm} onType={onType} />
        <button>Sign In</button>
      </form>
    </article>
  );
}
