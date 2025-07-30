import { ReactNode } from "react";
import { ADDRESSES } from "@/constants";
import { NavBarLink } from "./NavBarLink";

type CollapseControlsProps = {
  children?: ReactNode;
};

export function CollapseControls({ children }: CollapseControlsProps) {
  return children ? (
    <div className="navbar-nav d-flex d-lg-none flex-column rounded-2">
      {children}
      <DefaultCollapseControls />
    </div>
  ) : (
    <></>
  );
}

function DefaultCollapseControls() {
  return (
    <>
      <NavBarLink to={ADDRESSES.HOME} isCollapsed>
        Home
      </NavBarLink>
      <NavBarLink to={ADDRESSES.ABOUT} isCollapsed>
        About
      </NavBarLink>
    </>
  );
}
