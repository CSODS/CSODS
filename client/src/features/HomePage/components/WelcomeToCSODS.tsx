import { ADDRESSES } from "@/constants";
import { useNavigate } from "react-router-dom";

export function WelcomeToCSODS() {
  const navigate = useNavigate();
  const goToSignUp = () => {
    const { PATH, REGISTER } = ADDRESSES.AUTH;
    const registerPath = PATH + "/" + REGISTER;
    navigate(registerPath);
  };
  return (
    <section className="container-md bg-dark-3 translucent-40 p-3 p-lg-4">
      <h2 className="hs-responsive bolder mb-md-3">Welcome to CSO:DS</h2>
      <p className="mb-md-2">Don't have an account yet?</p>

      <p className="mb-md-4">
        Sign up now to gain access to student projects and be a part of the{" "}
        <b>Computer Science Organization: Developers' Space!</b>
      </p>

      <button
        type="button"
        className="btn btn-dark-4 px-md-5 px-3 me-2 "
        onClick={() => goToSignUp()}
      >
        <span>Sign Up</span>
      </button>
    </section>
  );
}

export default WelcomeToCSODS;
