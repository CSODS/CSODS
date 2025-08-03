import { CheckBox } from "@/components";
import { AuthHooks } from "@/core/auth";

/**
 * toggler for persistent log in
 * @returns
 */
export function RememberMe() {
  const [persist, resetPersist, togglePersist] =
    AuthHooks.useTogglePersistAuth();

  return (
    <CheckBox id="persist" checked={persist} onChange={togglePersist}>
      Remember Me
    </CheckBox>
  );
}
