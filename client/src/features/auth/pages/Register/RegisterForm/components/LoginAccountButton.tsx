import { ADDRESSES } from "@/constants";
import styles from "./LoginAccountButton.module.css";

export function LoginAccountButton() {  
    const loginAccountButton = styles["login-account-button"];

  return (
    <button
      className={`${loginAccountButton}`}
      onClick={() => 
        (window.location.href = ADDRESSES.AUTH.SIGN_IN)
      }
    >
      LOGIN
    </button>
  );
}