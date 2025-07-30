import { useEffect, useState } from "react";
import { useAuth, useRefreshToken } from "./hooks";
import { Outlet } from "react-router-dom";

export function PersistAuth() {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      await refresh();
    };

    const isTokenInvalid = !auth?.accessToken;

    if (isTokenInvalid) verifyRefreshToken();

    setIsLoading(false);
  }, [refresh]);

  useEffect(() => {
    console.log("isLoading: ", isLoading);
    console.log(`access token: `, auth?.accessToken);
  }, [isLoading, auth]);

  return isLoading ? <p>Loading...</p> : <Outlet />;
}
