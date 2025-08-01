import { useState } from "react";
import { RegisterFormData } from "../types";

export function useRegisterForm() {
  const [registerForm, setRegisterForm] = useState<RegisterFormData>({
    email: "",
    username: "",
    password: "",
    passwordMatch: "",
  });

  const onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setRegisterForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return {
    registerForm,
    setRegisterForm,
    onType,
  };
}
