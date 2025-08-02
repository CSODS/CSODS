import { useEffect } from "react";

export function SubmitProject() {
  useEffect(() => {
    async function redirectToGForms() {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      window.open(
        "https://docs.google.com/forms/d/e/1FAIpQLSfJ-Zycx9VlgpoaGjjQlcmwLZzSjzDhXMyXGzcTjeK-ILZ6GA/viewform?usp=header",
        "_blank"
      );
      return;
    }
    redirectToGForms();
  }, []);
  return (
    <div>
      <p>Redirecting to Google Forms...</p>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSfJ-Zycx9VlgpoaGjjQlcmwLZzSjzDhXMyXGzcTjeK-ILZ6GA/viewform?usp=header">
        Click this hyper link if you don't redirect automatically.
      </a>
    </div>
  );
}
