import { ReactNode } from "react";

export type CheckBoxProps = {
  children: ReactNode;
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CheckBox({ children, id, checked, onChange }: CheckBoxProps) {
  return (
    <div className="m-0 p-0 row">
      <input
        type="checkbox"
        className="col-auto"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="col-auto">
        {children}
      </label>
    </div>
  );
}
