import { useRef, useState } from "react";

export function useErrMsg() {
  const errRef = useRef<HTMLParagraphElement>(null);

  const [errMsg, setErrMsg] = useState<string>("");

  return { errRef, errMsg, setErrMsg };
}
