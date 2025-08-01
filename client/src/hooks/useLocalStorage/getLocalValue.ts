export function getLocalValue<T>(key: string, initValue: T) {
  //  SSR next.js
  if (typeof window === "undefined") return resolve(initValue);

  //  if a value is already stored
  const item = localStorage.getItem(key);

  if (item) {
    try {
      const localValue = JSON.parse(item);
      if (localValue) return localValue as T;
    } catch {
      return initValue;
    }
  }

  return resolve(initValue);
}

//  type guarding against functions that return value of type T
function resolve<T>(value: T | (() => T)): T {
  return value instanceof Function ? value() : value;
}
