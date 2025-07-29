import { CorsOptions } from "cors";
import { ENV } from ".";

export function getCorsOptions() {
  const whitelist = ENV.getCorsWhitelist();

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      // ! wrong : !origin || !whitelist.includes(origin)
      // Let this very idiotic blunder remind you that things as simple as FLIPPED conditions
      // can still fuck you up from behind.
      if (origin && whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS."));
      }
    },
    credentials: true,
  };

  return corsOptions;
}
