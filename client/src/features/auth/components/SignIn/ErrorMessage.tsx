type ErrorMessageProps = {
  message: string;
  errRef: React.RefObject<HTMLParagraphElement | null>;
};

export function ErrorMessage({ message, errRef }: ErrorMessageProps) {
  return (
    <p
      ref={errRef}
      className={`row ${message ? "" : "visually-hidden"}`}
      aria-live="assertive"
    >
      {message}
    </p>
  );
}
