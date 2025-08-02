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
      <p className="m-0 p-0 px-3 text-center fs-1 fw-bold">Welcome</p>

      <form
        className="m-0 mt-4 p-0 px-3 d-grid row-gap-4"
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
          Are you a student?
        </CheckBox>
        {toggleStudents ? (
          <StudentFields registerForm={registerForm} onType={onType} />
        ) : (
          <></>
        )}
        <div className="m-0 p-0 d-grid row-gap-1">
          <ErrorMessage message={errMsg} errRef={errRef} />
          <RegisterBtn />
        </div>
      </form>
    </article>
  );
}
