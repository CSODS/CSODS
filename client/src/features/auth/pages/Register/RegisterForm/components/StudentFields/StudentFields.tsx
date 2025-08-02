import { RegisterFieldsProps } from "../../types";
import { useStudentFocus } from "./useStudentFocus";
import { useStudentValidation } from "./useStudentValidation";

// todo: add visual cues for valid/invalid inputs
// todo: better design for input notes(?)
export function StudentFields({ registerForm, onType }: RegisterFieldsProps) {
  const { nameFocus, setNameFocus, numberFocus, setNumberFocus } =
    useStudentFocus();

  //  use this for visual cues
  const { validName, validNumber } = useStudentValidation(registerForm);

  return (
    <>
      {/* student name */}
      <div className="m-0 px-3 py-2 row border border-1 rounded-pill">
        <input
          type="text"
          id="studentName"
          placeholder="Student Name"
          className="m-0 p-0 color-default-white fs-6"
          autoComplete="off"
          onChange={(e) => onType(e)}
          value={registerForm.studentName ?? ""}
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="name-note"
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
        />
      </div>
      <p
        id="name-note"
        className={
          nameFocus && registerForm.studentName && !validName
            ? "text-start fs-small"
            : "visually-hidden"
        }
      >
        Invalid name format.
      </p>
      {/* student number */}
      <div className="m-0 px-3 py-2 row border border-1 rounded-pill">
        <input
          type="text"
          id="studentNumber"
          placeholder="Student Number"
          className="m-0 p-0 color-default-white fs-6"
          autoComplete="off"
          onChange={(e) => onType(e)}
          value={registerForm.studentNumber ?? ""}
          aria-invalid={validNumber ? "false" : "true"}
          aria-describedby="number-note"
          onFocus={() => setNumberFocus(true)}
          onBlur={() => setNumberFocus(false)}
        />
      </div>
      <p
        id="number-note"
        className={
          numberFocus && registerForm.studentNumber && !validNumber
            ? "text-start fs-small"
            : "visually-hidden"
        }
      >
        Invalid studentn number format.
      </p>
    </>
  );
}
