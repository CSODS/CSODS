import { SignInFormData } from "../../types";
import { RememberMe } from "./RememberMe";

type SignInButtonProps = {
  form: SignInFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SignInButton({ form, onChange }: SignInButtonProps) {
  return (
    <div className="m-0 px-3 row row-cols-1">
      <RememberMe form={form} onChange={onChange} />
      <button className="col">Sign In</button>
    </div>
  );
}
