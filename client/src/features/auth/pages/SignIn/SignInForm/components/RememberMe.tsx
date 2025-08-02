import { CheckBox } from "@/components";
import { AuthHooks } from "@/core/auth";

/**
 * toggler for persistent log in
 * @returns
 */
export function RememberMe() {
  // const { persist, setPersist } = AuthHooks.useAuth();

  // const togglePersist = () => {
  //   setPersist((prev) => !prev);
  // };

  // useEffect(() => {
  //   const persistRaw = persist ? "true" : "false";
  //   localStorage.setItem("persist", persistRaw);
  // }, [persist]);

  const [persist, resetPersist, togglePersist] =
    AuthHooks.useTogglePersistAuth();

  return (
    <CheckBox id="persist" checked={persist} onChange={togglePersist}>
      Remember Me
    </CheckBox>
  );
}
