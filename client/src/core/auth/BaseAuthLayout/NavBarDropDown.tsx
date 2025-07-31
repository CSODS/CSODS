import { ReactNode } from "react";

type DropDownProps = {
  children: ReactNode;
};

export function NavBarDropDown({ children }: DropDownProps) {
  return (
    <>
      <li className="nav-item dropdown">
        <div
          className="dropdown-toggle header-nav-element color-light-2"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        ></div>
        <ul className="dropdown-menu dropdown-menu-end">{children}</ul>
      </li>
    </>
  );
}
