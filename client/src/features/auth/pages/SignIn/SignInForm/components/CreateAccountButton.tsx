import { ADDRESSES } from "@/constants";
import styles from "./CreateAccountButton.module.css";

export function CreateAccountButton() {  
    const createAccountButton = styles["create-account-button"];

  return (
    <button
      className={`${createAccountButton}`}
      onClick={() => 
        (window.location.href = ADDRESSES.AUTH.REGISTER)
      }
    >
      CREATE ACCOUNT
    </button>
  );
}