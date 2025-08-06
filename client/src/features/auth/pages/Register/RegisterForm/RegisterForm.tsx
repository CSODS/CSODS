import { useEffect } from "react";
import {
  AuthFields,
  ErrorMessage,
  RegisterBtn,
  StudentFields,
} from "./components";
import { useErrMsg, useRegisterForm, useToggleStudentFields } from "./hooks";
import { handleRegister } from "./utils";
import { CheckBox } from "@/components";

/**
 * The register form itself
 * @returns
 */
export function RegisterForm() {
  const { errRef, errMsg, setErrMsg } = useErrMsg();

  const { registerForm, resetRegister, onType } = useRegisterForm();

  //  toggler for student. form data is always reset on toggle change.
  const [toggleStudents, resetToggle, onToggleStudents] =
    useToggleStudentFields(resetRegister);

  //  clear err msg on type.
  useEffect(() => {
    setErrMsg("");
  }, [registerForm]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //  todo: add notification for registration success
    //  * rightnow both err and success messages are both on err msg component
    handleRegister(registerForm, setErrMsg);
  };

  return (
    <article className="p-0">
      <p className="px-3 pb-2 fs-2 bolder">Sign Up</p>

      <form
        className="d-grid row-gap-3"
        onSubmit={handleSubmit}
      >
        {/* 
          form fields
          each field is a rounded pill div 
        */}
        <AuthFields registerForm={registerForm} onType={onType} />

        <CheckBox
          id="toggle-student-fields"
          checked={toggleStudents}
          onChange={onToggleStudents}
        >
          <span className="fs-responsive">Are you a student?</span>
        </CheckBox>
        {toggleStudents ? (
          <StudentFields registerForm={registerForm} onType={onType} />
        ) : (
          <></>
        )}
        <div className="mt-1 p-0 ">
          <ErrorMessage message={errMsg} errRef={errRef} />
          <RegisterBtn />
        </div>
      </form>
    </article>
  );
}
