import { RegisterFormData } from "./RegisterFormData";

export type RegisterFieldsProps = {
  registerForm: RegisterFormData;
  onType: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
