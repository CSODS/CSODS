import { ReactNode } from "react";
import { NavBarLayout } from "@/components";
import { NavBarLayoutProps } from "@/types";
import { NavBarControlsRight } from "./NavBarControlsRight";

type AuthLayoutProps = {
  dropDownControls?: ReactNode;
} & NavBarLayoutProps;

export function BaseAuthLayout({
  className,
  navBarElements,
  navBarControlsLeft,
  navBarControlsRight,
  hasCollapsed,
  collapsedControlsLeft,
  collapsedControlsRight,
}: AuthLayoutProps) {
  return (
    <NavBarLayout
      className={className}
      navBarElements={navBarElements}
      navBarControlsLeft={navBarControlsLeft}
      navBarControlsRight={
        <NavBarControlsRight controls={navBarControlsRight} />
      }
      hasCollapsed={hasCollapsed}
      collapsedControlsLeft={collapsedControlsLeft}
      collapsedControlsRight={collapsedControlsRight}
    />
  );
}
