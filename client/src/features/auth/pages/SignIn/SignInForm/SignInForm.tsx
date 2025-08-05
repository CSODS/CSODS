import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthHooks } from "@/core/auth";
import { ErrorMessage, SignInFields, SignInButton } from "./components";
import { useSignInForm } from "./hooks";
import { handleSignIn } from "./utils";

export function SignInForm() {
  const { setAuth } = AuthHooks.useAuth();
  const errRef = useRef<HTMLParagraphElement>(null);

  const { signInForm, onChange, errMsg, setErrMsg } = useSignInForm();

  //  clear err msg on type
  useEffect(() => {
    setErrMsg("");
  }, [signInForm]);

  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSignIn(signInForm, setErrMsg, setAuth, navigate, location);
  };

  return (
    <article className="p-0">
      <p className="px-3 pb-2 text-center fs-2 bolder">Sign In</p>

      <form
        className="d-grid row-gap-4"
        onSubmit={handleSubmit}
      >
        <SignInFields signInForm={signInForm} onType={onChange} />
        <div className="m-0 p-0 d-grid row-gap-1">
          <ErrorMessage message={errMsg} errRef={errRef} />
          <SignInButton form={signInForm} onChange={onChange} />
        </div>
      </form>
    </article>
  );
}
