import { useEffect } from "react";
import {
  AuthFields,
  ErrorMessage,
  RegisterBtn,
  StudentFields,
} from "./components";
import { useErrMsg, useRegisterForm } from "./hooks";
import { handleRegister } from "./utils";

/**
 * The register form itself
 * @returns
 */
export function RegisterForm() {
  const { errRef, errMsg, setErrMsg } = useErrMsg();

  const { registerForm, onType } = useRegisterForm();

  useEffect(() => {
    setErrMsg("");
  }, [registerForm]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleRegister(registerForm, setErrMsg);
  };

  return (
    <article className="p-0">
      <p className="m-0 p-0 px-3 text-center fs-1 fw-bold">Welcome</p>

      <form
        className="m-0 mt-4 p-0 px-3 d-grid row-gap-4"
        onSubmit={handleSubmit}
      >
        {/* form fields */}
        <AuthFields registerForm={registerForm} onType={onType} />
        <StudentFields registerForm={registerForm} onType={onType} />

        <div className="m-0 p-0 d-grid row-gap-1">
          <ErrorMessage message={errMsg} errRef={errRef} />
          <RegisterBtn />
        </div>
      </form>
    </article>
  );
}
