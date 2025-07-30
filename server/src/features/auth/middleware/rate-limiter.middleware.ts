import rateLimit, { Options } from "express-rate-limit";

const defaultOptions: Partial<Options> = {
  standardHeaders: "draft-8",
  legacyHeaders: false,
  statusCode: 429,
};

export const signInLimiter = rateLimit({
  ...defaultOptions,
  windowMs: 30 * 60 * 1000, // 30 minutes
  limit: 5, // 5 requests per window
  message: "Too many sign-in attempts. Please try again after 30 minutes.",
});

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 5, // 5 requests per window
  standardHeaders: "draft-8", // idk wtf this is.
  legacyHeaders: false,
  message: "Too many register attempts. Please try again after 1 hour.",
  statusCode: 429,
});

export const refreshLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 10, // 10 requests per window
  standardHeaders: "draft-8", // idk wtf this is.
  legacyHeaders: false,
  message: "Too many auth requests. Please try again after 1 hour.",
  statusCode: 429,
});

export const signOutLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // 5 requests per window
  standardHeaders: "draft-8", // idk wtf this is.
  legacyHeaders: false,
  message: "Too many auth requests. Please try again after 1 hour.",
  statusCode: 429,
});
