import { useContext, useEffect, useRef, useState } from "react";
import { authTypes } from "./types";
import { ADDRESSES } from "@/constants";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./components";
import { trySignIn } from "./utils";

export function SignIn() {
  const registerLink = ADDRESSES.AUTH.PATH + "/" + ADDRESSES.AUTH.REGISTER;

  const { setAuth } = useContext(AuthContext)!;

  const identifierRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [errMsg, setErrMsg] = useState<string>("");
  // todo: replace this with navigating to a different page in the future.
  const [success, setSuccess] = useState<string>("");

  const [signInForm, setSignInForm] = useState<authTypes.SignInForm>({
    identifier: "",
    password: "",
  });

  useEffect(() => {
    if (identifierRef?.current) identifierRef.current.focus();
  }, []);

  useEffect(() => {
    // console.log("Identifier:", signInForm.identifier);
    // console.log("Password:", signInForm.password);
    setErrMsg("");
  }, [signInForm.identifier, signInForm.password]);

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const elementName = e.target.id;

    elementName === "identifier"
      ? setSignInForm((prev) => ({
          ...prev,
          identifier: e.target.value,
        }))
      : setSignInForm((prev) => ({
          ...prev,
          password: e.target.value,
        }));
  };

  const navigate = useNavigate();
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Identifier:", signInForm.identifier);
    console.log("Password:", signInForm.password);

    await trySignIn(signInForm);

    // setSignInForm({ identifier: "", password: "" });

    // navigate("/home");
  };

  return (
    <section>
      <section className="card-dark-purple border border-1 border-white rounded-3">
        <article className="p-0">
          <p
            ref={errRef}
            className={`row ${errMsg ? "" : "visually-hidden"}`}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <h1 className="m-0 p-0 text-center">Welcome</h1>

          <form className="m-0 p-0 row" onSubmit={handleSignIn}>
            <input
              type="text"
              id="identifier"
              ref={identifierRef}
              placeholder="Email/Username"
              className="m-0 p-0 row border color-default-white"
              autoComplete="off"
              onChange={(e) => handleType(e)}
              value={signInForm.identifier}
              required
            />
            <input
              type="password"
              id="password"
              className="m-0 p-0 row border color-black"
              onChange={(e) => handleType(e)}
              value={signInForm.password}
              required
            />
            <button>Sign In</button>
          </form>
          <NavLink to={registerLink}>Create Account</NavLink>
        </article>
      </section>
    </section>
  );
}
