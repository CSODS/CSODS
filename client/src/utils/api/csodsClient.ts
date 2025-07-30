import { CSODS_API_PATHS } from "@/constants";
import axios from "axios";

export const csodsClient = axios.create({
  baseURL: CSODS_API_PATHS.BASE,
});
