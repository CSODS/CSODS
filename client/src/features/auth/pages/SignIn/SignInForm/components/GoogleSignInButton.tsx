import { ADDRESSES } from "@/constants";
import styles from "./GoogleSignInButton.module.css";

export function GoogleSignInButton() {  
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
        Login with Google
    </button>
  );
}