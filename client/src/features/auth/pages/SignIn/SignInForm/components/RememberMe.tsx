import { CheckBox } from "@/components";
import { AuthHooks } from "@/core/auth";
import { SignInFormData } from "../../types";

type RememberMeProps = {
  form: SignInFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * toggler for persistent log in
 * @returns
 */
export function RememberMe({ form, onChange }: RememberMeProps) {
  return (
    <CheckBox
      id="isPersistentAuth"
      checked={form.isPersistentAuth ?? false}
      onChange={onChange}
    >
      Remember Me
    </CheckBox>
  );
}
