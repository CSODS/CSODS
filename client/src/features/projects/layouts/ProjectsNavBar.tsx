import { BaseAuthNavBar } from "@/core/auth";
import styles from "./ProjectsNavBar.module.scss";
import { SearchBar } from "./SearchBar";

interface ProjectsNavBarProps {
  navBarVariant?: 1 | 2;
}

export function ProjectsNavBar({ navBarVariant }: ProjectsNavBarProps) {
  let navBarClass;

  switch (navBarVariant) {
    case 1: {
      navBarClass = `${styles["navbar-variant-1"]} translucent-100`;
      break;
    }
    case 2: {
      navBarClass = `${styles["navbar-variant-2"]} translucent-100`;
      break;
    }
    default: {
      navBarClass = "";
      break;
    }
  }

  return (
    <BaseAuthNavBar className={navBarClass} navBarElements={<SearchBar />} />
  );
}
