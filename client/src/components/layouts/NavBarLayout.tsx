import { Link, Outlet } from "react-router-dom";
import { ADDRESSES } from "@/constants";
import { CollapseControls, NavBarControls } from "../shared";
import { NavBarLayoutProps } from "@/types";

//  todo: add dynamic styling for child components as well
export function NavBarLayout({
  className,
  navBarElements,
  navBarControls,
  collapsedControls,
  navBarControlsLeft,
  navBarControlsRight,
  hasCollapsed,
  collapsedControlsLeft,
  collapsedControlsRight,
}: NavBarLayoutProps) {
  return (
    <>
      <nav className="p-0 navbar navbar-expand-lg sticky-top">
        <div className={`px-md-3 px-1 py-0 container-fluid ${className}`}>
          <Link
            to={ADDRESSES.LANDING_PAGE}
            className="m-0 me-md-1 my-lg-2 my-1 d-flex flex-row justify-content-center align-items-center text-decoration-none color-light-1"
          >
            <img
              src="/lucso-logo-no-bg.png"
              alt="CSO_LOGO"
              className="header-logo"
            />
            <p className="m-0 p-0 ps-2 d-lg-block d-none fs-4 bolder">CSO:DS</p>
          </Link>
          {navBarElements}
          <button
            className="mx-1 p-1 navbar-toggler bg-transparent border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list fs-1 color-light-1"></i>
          </button>
          <article className="collapse navbar-collapse" id="navbar">
            <NavBarControls
              hasCollapsed={!!hasCollapsed}
              controlsLeft={navBarControlsLeft}
              controlsRight={navBarControlsRight}
            />
            <CollapseControls
              controlsLeft={collapsedControlsLeft}
              controlsRight={collapsedControlsRight}
            />
          </article>
        </div>
      </nav>
      <main className="vh-100">
        <Outlet />
      </main>
    </>
  );
}
