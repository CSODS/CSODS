import { CSODS_API_PATHS } from "@/constants";
import axios from "axios";

const { BASE } = CSODS_API_PATHS;

export const securedAxios = axios.create({
  baseURL: BASE,
  withCredentials: true,
});
