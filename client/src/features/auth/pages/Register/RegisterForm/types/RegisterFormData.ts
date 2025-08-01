import { RegisterRequest } from "./RegisterRequest";

export type RegisterFormData = {
  passwordMatch: string;
} & RegisterRequest;
