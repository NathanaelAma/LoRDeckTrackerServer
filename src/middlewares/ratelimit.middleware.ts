import { rateLimit } from 'express-rate-limit';

/**
 * Express middleware for rate limiting requests.
 *
 * @remarks
 * This middleware limits the number of requests that can be made within a specific time window.
 *
 * @param options - The rate limiting options.
 * @returns The rate limiting middleware function.
 */
const limiterMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: true,
});

export default limiterMiddleware;
