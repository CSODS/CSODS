import { RegisterFormData } from "../types";
import { useRecord } from "@/hooks/useInput";

export function useRegisterForm() {
  const [registerForm, resetRegister, onType] = useRecord<RegisterFormData>(
    "csods:auth-register",
    {
      email: "",
      username: "",
      password: "",
      passwordMatch: "",
    },
    "id",
    {
      resetKeys: [
        "password",
        "passwordMatch",
        "studentName",
        "studentNumber",
        "userIconUrl",
      ],
      defaultValues: {
        password: "",
        passwordMatch: "",
        studentName: "",
        studentNumber: "",
        userIconUrl: "",
      },
    }
  );

  return {
    registerForm,
    resetRegister,
    onType,
  };
}
