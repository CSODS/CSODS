import { ReactNode } from "react";
import { useSignOut } from "../hooks";

type SignOutBtnProps = {
  children?: ReactNode;
  className: string;
};

export function SignOutBtn({ children, className }: SignOutBtnProps) {
  const signOut = useSignOut();

  return (
    <button onClick={signOut} className={className}>
      {children ?? "Sign Out"}
    </button>
  );
}
