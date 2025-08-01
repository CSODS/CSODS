import { RememberMe } from "./RememberMe";

export function SignInButton() {
  return (
    <div className="m-0 px-3 row row-cols-1">
      <RememberMe />
      <button className="col">Sign In</button>
    </div>
  );
}
