import rateLimit from "express-rate-limit";

export const projectsRouteLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,        // 1 minute
    limit: 15,                      // 15 requests per window
    standardHeaders: 'draft-8',     // idk wtf this is.
    legacyHeaders: false,
    message: 'Too many requests to projects route. Please try again after 1 minute.',
    statusCode: 429
});

export const projectTagsRouteLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,        // 1 minute
    limit: 5,                       // 5 requests per window
    standardHeaders: 'draft-8',     // idk wtf this is.
    legacyHeaders: false,
    message: 'Too many requests to tags route. Please try again after 1 minute.',
    statusCode: 429
});

export const authRouteLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,       // 1 hour
    limit: 5,                       // 5 requests per window
    standardHeaders: 'draft-8',     // idk wtf this is.
    legacyHeaders: false,
    message: 'Too many auth requests. Please try again after 1 hour.',
    statusCode: 429
});