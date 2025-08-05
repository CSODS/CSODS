import { SignInFormData } from "../../types";
import { RememberMe } from "./RememberMe";

type SignInButtonProps = {
  form: SignInFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SignInButton({ form, onChange }: SignInButtonProps) {
  return (
    <div className="mb-2 px-3 row row-cols-1 gap-2">
      <RememberMe form={form} onChange={onChange} />
      <button className="col btn-dark-4 hover-color-light-3 hover-lighten py-1 rounded-1 small bold">
        Login
      </button>
    </div>
  );
}
