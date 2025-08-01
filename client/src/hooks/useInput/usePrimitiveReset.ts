import { useStoredPrimitive } from "../useLocalStorage";

/**
 * useState wrapper hook with additional reset function.
 * @param key the local storage key
 * @param initValue initial value
 * @returns
 */
export function usePrimitiveReset<T>(key: string, initValue: T) {
  const [value, setValue] = useStoredPrimitive<T>(key, initValue);

  const reset = () => setValue(initValue);

  return [value, setValue, reset] as const;
}
