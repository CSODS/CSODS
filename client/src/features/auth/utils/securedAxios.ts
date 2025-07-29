import { CSODS_API_PATHS } from "@/constants";
import { AUTH_ENDPOINTS } from "@/features/auth/constants";
import axios from "axios";

const baseUrl = CSODS_API_PATHS.BASE + AUTH_ENDPOINTS.PATH;

export const securedAxios = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
