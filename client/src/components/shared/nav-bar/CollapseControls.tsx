import { ReactNode } from "react";
import { ADDRESSES } from "@/constants";
import { NavBarLink } from "./NavBarLink";

type CollapseControlsProps = {
  controlsLeft?: ReactNode;
  controlsRight?: ReactNode;
};

export function CollapseControls({
  controlsLeft,
  controlsRight,
}: CollapseControlsProps) {
  return (
    <div className="navbar-nav d-flex d-lg-none flex-column rounded-2">
      {controlsLeft}
      <DefaultCollapseControls />
      {controlsRight}
    </div>
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
