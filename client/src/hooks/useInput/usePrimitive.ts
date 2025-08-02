import { usePrimitiveReset } from "./usePrimitiveReset";

/**
 * useState wrapper hook for primitive data types.
 * @param key the local storage key
 * @param initValue initial value
 * @returns
 */
export function usePrimitive<T>(key: string, initValue: T) {
  const [value, setValue, reset] = usePrimitiveReset<T>(key, initValue);

  // parses change event value as the same type as initValue.
  const parseValue = (val: string | boolean) => {
    if (typeof initValue === "number") return Number(val) as T;
    return val as T;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setValue(parseValue(value));
  };

  return [value, reset, onChange] as const;
}
