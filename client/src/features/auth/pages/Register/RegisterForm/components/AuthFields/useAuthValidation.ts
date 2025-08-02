import { useEffect, useState } from "react";
import { AUTH_REGEX } from "../../constants";
import { RegisterFormData } from "../../types";

export function useAuthValidation(registerForm: RegisterFormData) {
  const [validEmail, setValidEmail] = useState<boolean>(false);

  const [validUser, setValidUser] = useState<boolean>(false);

  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [validMatch, setValidMatch] = useState<boolean>(false);

  useEffect(() => {
    setValidEmail(AUTH_REGEX.EMAIL.test(registerForm.email));
  }, [registerForm.email]);

  useEffect(() => {
    setValidUser(AUTH_REGEX.USERNAME.test(registerForm.username));
  }, [registerForm.username]);

  useEffect(() => {
    setValidPwd(AUTH_REGEX.PASSWORD.test(registerForm.password));
    const match = registerForm.password === registerForm.passwordMatch;
    setValidMatch(match);
  });

  return { validEmail, validUser, validPwd, validMatch };
}
