import { usePrimitive } from "@/hooks/useInput";

export function useTogglePersistAuth() {
  const [persist, reset, onToggle] = usePrimitive<boolean>(
    "csods:persist-auth",
    false
  );

  return [persist, reset, onToggle] as const;
}
