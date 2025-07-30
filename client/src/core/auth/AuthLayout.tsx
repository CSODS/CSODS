import { NavBarLayout, NavBarLink } from "@/components";
import { ADDRESSES } from "@/constants";
import { useAuth } from "./hooks";
import { useEffect, useState } from "react";

export function AuthLayout() {
  return <NavBarLayout navBarControls={<AuthControls />} />;
}

type NavBarDetails = {
  link: string;
  text: string;
};

function AuthControls() {
  const { PATH, SIGN_IN, SIGN_OUT } = ADDRESSES.AUTH;
  const { auth } = useAuth();
  const [navBar, setNavBar] = useState<NavBarDetails>({
    link: PATH + "/" + SIGN_IN,
    text: "Sign In",
  });

  useEffect(() => {
    if (auth)
      setNavBar({
        link: PATH + "/" + SIGN_OUT,
        text: "Sign Out",
      });
  }, [auth]);

  return (
    <>
      <li className="nav-item dropdown">
        <div
          className="dropdown-toggle header-nav-element color-light-2"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        ></div>
        <ul className="dropdown-menu">
          <li>
            <NavBarLink to={navBar.link}>
              <p className="m-0 color-default-black">{navBar.text}</p>
            </NavBarLink>
          </li>
        </ul>
      </li>
    </>
  );
}
