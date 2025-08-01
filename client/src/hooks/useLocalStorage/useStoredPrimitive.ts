import { useEffect, useState } from "react";
import { getLocalValue } from "./getLocalValue";

/**
 * useState hook wrapper for stored primitive values in local storage of type T
 * @param key local storage key
 * @param initValue the initial vlaue
 * @returns
 */
export function useStoredPrimitive<T>(key: string, initValue: T) {
  const [value, setValue] = useState<T>(() => getLocalValue<T>(key, initValue));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Error setting value in local storage: ", err);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
