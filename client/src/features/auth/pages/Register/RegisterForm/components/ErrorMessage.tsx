import { useEffect } from "react";

type ErrorMessageProps = {
  message: string;
  errRef: React.RefObject<HTMLParagraphElement | null>;
};

export function ErrorMessage({ message, errRef }: ErrorMessageProps) {
  useEffect(() => {
    if (errRef.current && message) errRef.current.focus();
  }, [errRef, message]);

  return (
    <p
      ref={errRef}
      className={`m-0 p-0 flex-row color-util-error ${
        message ? "" : "visually-hidden"
      }`}
      aria-live="assertive"
      tabIndex={-1}
    >
      {message}
    </p>
  );
}
