import { useRecordReset } from "./useRecordReset";

/**
 * useState wrapper hook for record types
 * @param recordKey the local storage key
 * @param initValue initial value
 * @param targetIdentifier choose if the identifier is the target element's id or name
 * @param options optional options object for reset values before storing to local storage
 * @returns
 */
export function useRecord<T extends Record<string, any>>(
  recordKey: string,
  initValue: T,
  targetIdentifier: "id" | "name",
  options?: { resetKeys: (keyof T)[]; defaultValues: Partial<T> }
) {
  const [value, setValue, reset] = useRecordReset<T>(
    recordKey,
    initValue,
    options
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue((prev) => {
      const { target } = e;
      const key = target[targetIdentifier];
      const value = target.type === "checkbox" ? target.checked : target.value;

      return {
        ...prev,
        [key]: value,
      };
    });

  return [value, reset, onChange] as const;
}
