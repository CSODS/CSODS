import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export function useAlertInvalidSession() {
  const { auth } = useAuth();
  const [alertInvalidSession, setAlertInvalidSession] = useState<boolean>(
    auth === null
  );

  useEffect(() => {
    setAlertInvalidSession(auth === null);
  }, [auth]);

  useEffect(() => {
    const getTimerId = () => {
      if (alertInvalidSession) {
        return setTimeout(() => {
          setAlertInvalidSession(false);
        }, 3000);
      }
    };

    const timerId = getTimerId();

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [alertInvalidSession]);

  return [alertInvalidSession, setAlertInvalidSession] as const;
}
