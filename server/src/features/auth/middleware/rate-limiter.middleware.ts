import rateLimit from "express-rate-limit";

export const authRouteLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 5, // 5 requests per window
  standardHeaders: "draft-8", // idk wtf this is.
  legacyHeaders: false,
  message: "Too many auth requests. Please try again after 1 hour.",
  statusCode: 429,
});
