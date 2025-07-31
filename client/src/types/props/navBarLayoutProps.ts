import { ReactNode } from "react";

export type NavBarLayoutProps = {
  /**
   * @field
   * css class extensions for the navbar container.
   */
  className?: string;
  navBarElements?: ReactNode;
  /**
   * @deprecated
   */
  navBarControls?: ReactNode;
  navBarControlsLeft?: ReactNode;
  navBarControlsRight?: ReactNode;
  /**
   * @deprecated
   */
  collapsedControls?: ReactNode;
  hasCollapsed?: boolean;
  collapsedControlsLeft?: ReactNode;
  collapsedControlsRight?: ReactNode;
};
