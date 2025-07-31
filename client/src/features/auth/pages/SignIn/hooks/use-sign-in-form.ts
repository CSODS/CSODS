import { useState } from "react";
import { SignInFormData } from "../types";

export function useSignInForm() {
  const [errMsg, setErrMsg] = useState<string>("");
  const [signInForm, setSignInForm] = useState<SignInFormData>({
    identifier: "",
    password: "",
  });

  const onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setSignInForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return { signInForm, setSignInForm, onType, errMsg, setErrMsg };
}
