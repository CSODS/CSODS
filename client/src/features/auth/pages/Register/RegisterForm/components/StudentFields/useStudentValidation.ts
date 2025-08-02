import { useEffect, useState } from "react";
import { RegisterFormData } from "../../types";
import { AUTH_REGEX } from "../../constants";

export function useStudentValidation(registerForm: RegisterFormData) {
  const [validName, setValidName] = useState<boolean>(false);
  const [validNumber, setValidNumber] = useState<boolean>(false);

  useEffect(() => {
    if (registerForm.studentName)
      setValidName(AUTH_REGEX.STUDENT_NAME.test(registerForm.studentName));
    //* set to true if no value
    //  student name is optional
    else setValidName(true);
  }, [registerForm.studentName]);

  useEffect(() => {
    if (registerForm.studentNumber)
      setValidNumber(
        AUTH_REGEX.STUDENT_NUMBER.test(registerForm.studentNumber)
      );
    //* set to true if no value
    //  student number is optional
    else setValidNumber(true);
  }, [registerForm.studentNumber]);

  return { validName, validNumber };
}
