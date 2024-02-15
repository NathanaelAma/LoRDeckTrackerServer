import { rateLimit } from "express-rate-limit";

const limiterMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: true,
});

export default limiterMiddleware;
