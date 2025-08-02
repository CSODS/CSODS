import { useEffect, useState } from "react";
import { useAuth, useRefreshToken, useTogglePersistAuth } from "./hooks";
import { Outlet } from "react-router-dom";

export function PersistAuth() {
  const { auth } = useAuth();
  const [persist] = useTogglePersistAuth();
  const refresh = useRefreshToken();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      await refresh();
      isMounted && setIsLoading(false);
    };

    const isTokenInvalid = !auth?.accessToken;

    isTokenInvalid ? verifyRefreshToken() : setIsLoading(false);
    return () => {
      isMounted = false;
    };
  }, [auth]);

  return !persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />;
}
