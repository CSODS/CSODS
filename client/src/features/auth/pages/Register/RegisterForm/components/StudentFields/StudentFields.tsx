import { RegisterFieldsProps } from "../../types";
import { useStudentFocus } from "./useStudentFocus";
import { useStudentValidation } from "./useStudentValidation";
import styles from "./StudentFields.module.scss";

// todo: add visual cues for valid/invalid inputs
// todo: better design for input notes(?)
export function StudentFields({ registerForm, onType }: RegisterFieldsProps) {
  const { nameFocus, setNameFocus, numberFocus, setNumberFocus } =
    useStudentFocus();

  //  use this for visual cues
  const { validName, validNumber } = useStudentValidation(registerForm);

  const groupForm = styles["form-group-floating"];
  const controlForm = styles["form-control-floating"];

  return (
    <>
      {/* student name */}
      <div className={`position-relative border border-1 ${groupForm}`}>
        <input
          type="text"
          id="studentName"
          className={`color-default-white pe-5 small ${controlForm} ${registerForm.studentName ? styles["not-empty"] : ""}`}
          autoComplete="off"
          onChange={(e) => onType(e)}
          value={registerForm.studentName ?? ""}
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="name-note"
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
        />
        <label htmlFor="studentName">Student Name</label>
        <span className="position-absolute top-50 end-0 translate-middle-y me-3">
          <i className="bi bi-person-fill"></i>
        </span>
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
      <div className={`position-relative border border-1 ${groupForm}`}>
        <input
          type="text"
          id="studentNumber"
          className={`color-default-white pe-5 small ${controlForm} ${registerForm.studentNumber ? styles["not-empty"] : ""}`}
          autoComplete="off"
          onChange={(e) => onType(e)}
          value={registerForm.studentNumber ?? ""}
          aria-invalid={validNumber ? "false" : "true"}
          aria-describedby="number-note"
          onFocus={() => setNumberFocus(true)}
          onBlur={() => setNumberFocus(false)}
        />
        <label htmlFor="studentNumber">Student Number</label>
        <span className="position-absolute top-50 end-0 translate-middle-y me-3">
          <i className="bi bi-key-fill"></i>
        </span>
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
