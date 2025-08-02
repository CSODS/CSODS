import { usePrimitive } from "@/hooks/useInput";
import { useEffect } from "react";

/**
 * toggler for the student fields section in register form
 * @param resetForm a function that resets the value of the form data to the
 * initial values. used for flushing data whenever the student fields are toggled.
 * @returns
 */
export function useToggleStudentFields(resetForm: () => void) {
  const [toggleStudent, reset, onChange] = usePrimitive<boolean>(
    "csods:toggle-student-fields",
    false
  );

  //  flush form data whenever student fields are toggled
  useEffect(() => {
    resetForm();
  }, [toggleStudent]);

  return [toggleStudent, reset, onChange] as const;
}
