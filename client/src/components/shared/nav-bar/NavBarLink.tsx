import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type NavBarLinkProps = {
  children: ReactNode;
  to: string;
  isCollapsed?: boolean;
};

export function NavBarLink({ children, to, isCollapsed }: NavBarLinkProps) {
  return (
    <NavLink
      to={to}
      className={`${
        isCollapsed ? "" : "mx-2 d-flex align-items-center"
      } header-nav-element color-light-2`}
    >
      {children}
    </NavLink>
  );
}
