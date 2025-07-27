import { CorsOptions } from "cors";
import { ENV } from ".";

export function getCorsOptions() {
  const whitelist = ENV.getCorsWhitelist();

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (!origin || !whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS."));
      }
    },
  };

  return corsOptions;
}
