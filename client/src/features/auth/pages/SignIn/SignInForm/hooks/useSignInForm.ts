import { useState } from "react";
import { SignInFormData } from "../../types";
import { useRecord } from "@/hooks/useInput";

export function useSignInForm() {
  const [errMsg, setErrMsg] = useState<string>("");
  const [signInForm, resetSignIn, onType] = useRecord<SignInFormData>(
    "csods:auth-sign-in",
    {
      identifier: "",
      password: "",
    },
    "id",
    { resetKeys: ["password"], defaultValues: { password: "" } }
  );

  return { signInForm, resetSignIn, onType, errMsg, setErrMsg };
}
