import { useState } from "react";
import { SignInFormData } from "../../types";
import { useRecord } from "@/hooks/useInput";

export function useSignInForm() {
  const [errMsg, setErrMsg] = useState<string>("");
  const [signInForm, resetSignIn, onChange] = useRecord<SignInFormData>(
    "csods:auth-sign-in",
    {
      identifier: "",
      password: "",
      isPersistentAuth: false,
    },
    "id",
    {
      resetKeys: ["password", "isPersistentAuth"],
      defaultValues: { password: "", isPersistentAuth: false },
    }
  );

  return { signInForm, resetSignIn, onChange, errMsg, setErrMsg };
}
