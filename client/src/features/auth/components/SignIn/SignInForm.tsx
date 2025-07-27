import { useEffect, useRef } from "react";
import { useAuth } from "../../hooks";
import { useSignInForm } from "./hooks";
import { handleSignIn } from "./utils";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "./ErrorMessage";

export function SignInForm() {
  const { setAuth } = useAuth();

  const identifierRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const { signInForm, onType, errMsg, setErrMsg } = useSignInForm();

  useEffect(() => {
    if (identifierRef?.current) identifierRef.current.focus();
  }, []);

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
        <button>Sign In</button>
      </form>
    </article>
  );
}
