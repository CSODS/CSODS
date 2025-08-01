import { StoredRecord } from "@/types";
import { useStoredRecord } from "../useLocalStorage";

/**
 * useState wrapper hook with additional reset function.
 * @param recordKey the local storage key
 * @param initValue initial value
 * @param targetIdentifier choose if the identifier is the target element's id or name
 * @param options optional options object for reset values before storing to local storage
 * @returns
 */
export function useRecordReset<T extends StoredRecord>(
  recordKey: string,
  initValue: T,
  options?: { resetKeys: (keyof T)[]; defaultValues: Partial<T> }
) {
  const [value, setValue] = useStoredRecord<T>(recordKey, initValue, options);

  const reset = () => setValue(initValue);

  return [value, setValue, reset] as const;
}
