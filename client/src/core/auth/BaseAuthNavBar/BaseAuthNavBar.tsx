import { ReactNode } from "react";
import { NavBarLayout } from "@/components";
import { NavBarLayoutProps } from "@/types";
import { NavBarControlsRight } from "./NavBarControlsRight";

type AuthLayoutProps = {
  dropDownControls?: ReactNode;
} & NavBarLayoutProps;

export function BaseAuthNavBar({
  className,
  navBarElements,
  navBarControlsLeft,
  navBarControlsRight,
  hasCollapsed,
  collapsedControlsLeft,
  collapsedControlsRight,
  dropDownControls,
}: AuthLayoutProps) {
  return (
    <NavBarLayout
      className={className}
      navBarElements={navBarElements}
      navBarControlsLeft={navBarControlsLeft}
      navBarControlsRight={
        <NavBarControlsRight
          controls={navBarControlsRight}
          dropDownControls={dropDownControls}
        />
      }
      hasCollapsed={hasCollapsed}
      collapsedControlsLeft={collapsedControlsLeft}
      collapsedControlsRight={collapsedControlsRight}
    />
  );
}
