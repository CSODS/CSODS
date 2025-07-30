import { ReactNode } from "react";
import { ADDRESSES } from "@/constants";
import { NavBarLink } from "./NavBarLink";

type NavBarControlsProps = {
  children?: ReactNode;
  hasCollapsed: boolean;
};

export function NavBarControls({
  children,
  hasCollapsed,
}: NavBarControlsProps) {
  const collapsing = hasCollapsed ? "d-none d-lg-flex" : "";

  console.log("children is: ", !!children);
  return (
    <section className={`ms-auto m-0 p-0 gap-2 navbar-nav  ${collapsing}`}>
      {children}
      <DefaultNavBarControls />
    </section>
  );
}

function DefaultNavBarControls() {
  return (
    <>
      <NavBarLink to={ADDRESSES.HOME}>Home</NavBarLink>
      <NavBarLink to={ADDRESSES.ABOUT}>About</NavBarLink>
    </>
  );
}
