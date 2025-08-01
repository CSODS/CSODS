import { useEffect, useState } from "react";
import { AUTH_REGEX } from "../constants";
import { useRegisterForm } from "./useRegisterForm";

export function useStudentValidation() {
  const { registerForm } = useRegisterForm();

  const [validStudentName, setValidStudentName] = useState<boolean>(false);
  const [validStudentNumber, setValidStudentNumber] = useState<boolean>(false);

  useEffect(() => {
    if (registerForm.studentName)
      setValidStudentName(
        AUTH_REGEX.STUDENT_NAME.test(registerForm.studentName)
      );
    //* set to true if no value
    //  student name is optional
    else setValidStudentName(true);
  }, [registerForm.studentName]);

  useEffect(() => {
    if (registerForm.studentNumber)
      setValidStudentNumber(
        AUTH_REGEX.STUDENT_NUMBER.test(registerForm.studentNumber)
      );
    //* set to true if no value
    //  student number is optional
    else setValidStudentNumber(true);
  }, [registerForm.studentNumber]);

  return {
    validStudentName,
    validStudentNumber,
  };
}
