import { BaseAuthLayout } from "@/core/auth";
import styles from "./ProjectListLayout.module.scss";
import { SearchBar } from "./SearchBar";

interface ProjectListLayoutProps {
  navBarVariant?: 1 | 2;
}

export function ProjectListLayout({ navBarVariant }: ProjectListLayoutProps) {
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
    <BaseAuthLayout className={navBarClass} navBarElements={<SearchBar />} />
  );
}
