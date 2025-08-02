import { useState } from "react";

export function useAuthFocus() {
  const [emailFocus, setEmailFocus] = useState<boolean>(false);
  const [userFocus, setUserFocus] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);

  return {
    emailFocus,
    setEmailFocus,
    userFocus,
    setUserFocus,
    pwdFocus,
    setPwdFocus,
    matchFocus,
    setMatchFocus,
  };
}
