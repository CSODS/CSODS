import { useEffect, useState } from "react";
import { getLocalValue } from "./getLocalValue";
import { StoredRecord, StoredValue } from "@/types";

/**
 * useState hook wrapper for stored records in local storage of type T
 * @param recordKey the local storage key
 * @param initValue the initial value
 * @param options optional options object for specifying values that should be reset
 * before storing to local storage
 * @returns
 */
export function useStoredRecord<T extends StoredRecord>(
  recordKey: string,
  initValue: T,
  options?: { resetKeys: (keyof T)[]; defaultValues: Partial<T> }
) {
  const [value, setValue] = useState<T>(() =>
    getLocalValue<T>(recordKey, initValue)
  );

  useEffect(() => {
    try {
      let valueStore: StoredRecord = value;

      const hasOptions = !!options;

      const hasResetKeys = hasOptions && options.resetKeys.length > 0;

      if (hasOptions && hasResetKeys) {
        const { resetKeys, defaultValues } = options;
        const resetSet = new Set(resetKeys);

        type StoredEntry = [string, StoredValue];
        const resetEntries: StoredEntry[] = Object.entries(value).map(
          ([k, v]) =>
            resetSet.has(k) ? [k, defaultValues[k] ?? initValue[k]] : [k, v]
        );

        valueStore = Object.fromEntries(resetEntries);
      }

      localStorage.setItem(recordKey, JSON.stringify(valueStore));
    } catch (err) {
      console.error("Error setting value in local storage: ", err);
    }
  }, [recordKey, value, JSON.stringify(options)]);

  return [value, setValue] as const;
}
