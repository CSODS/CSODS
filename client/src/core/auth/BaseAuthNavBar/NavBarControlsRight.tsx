import { ReactNode } from "react";
import { NavBarLink } from "@/components";
import { ADDRESSES } from "@/constants";
import { useAuth } from "../hooks";
import { NavBarDropDown } from "./NavBarDropDown";
import { SignOutBtn } from "./SignOutBtn";

type ControlsProps = {
  controls: ReactNode;
  dropDownControls?: ReactNode;
};

export function NavBarControlsRight({
  controls,
  dropDownControls,
}: ControlsProps) {
  const { auth } = useAuth();

  return (
    <>
      {controls}
      <NavBarDropDown>
        {dropDownControls}
        {auth ? (
          <SignOutBtn className="m-0 color-default-black" />
        ) : (
          <SignInBtn className="m-0 color-default-black" />
        )}
      </NavBarDropDown>
    </>
  );
}

type SignInBtnProps = {
  className?: string;
  children?: ReactNode;
};

function SignInBtn({ className, children }: SignInBtnProps) {
  const { PATH, SIGN_IN } = ADDRESSES.AUTH;
  return (
    <NavBarLink to={PATH + "/" + SIGN_IN}>
      <p className={className}>{children ?? "Sign In"}</p>
    </NavBarLink>
  );
}
