import { ADDRESSES } from "@/constants";
import styles from "./GoogleSignUpButton.module.css";

export function GoogleSignUpButton() {  
    const googleButton = styles["google-button"];

  return (
    <button
        className={`${googleButton}`}
        onClick={() => 
        (window.location.href = ADDRESSES.AUTH.REGISTER)
        }
    >
        <img 
            src="/google.png" 
            alt="Google Logo"
            className="me-2"
            style={{maxHeight: "15px"}}
        >
        </img>
        Sign Up with Google
    </button>
  );
}