import { AUTH_ENDPOINTS } from "../constants";
import { securedAxios } from "../utils";
import { useAuth } from "./useAuth";

export function useSignOut() {
  const { setAuth } = useAuth();

  const signOut = async () => {
    const { PATH, SIGN_OUT } = AUTH_ENDPOINTS;
    const endpoint = PATH + SIGN_OUT;

    setAuth(null);

    // todo: add log out message to ui.
    await securedAxios
      .post(endpoint)
      .catch((err) => console.error("Error logging out.", err));
  };

  return signOut;
}
