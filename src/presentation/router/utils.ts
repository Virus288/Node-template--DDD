import rateLimit from 'express-rate-limit';
import type express from 'express';

/**
 * Rate limiter for routes access.
 * This limiter is disabled in tests.
 * @param _req Express.Request.
 * @param _res Express.Response.
 * @param next Express.Next.
 */
const limiter =
  process.env.NODE_ENV === 'test'
    ? (_req: express.Request, _res: express.Response, next: express.NextFunction): void => {
        next();
      }
    : rateLimit({
        windowMs: 60 * 1000,
        limit: 30,
        message: { data: 'Too many requests from this IP, please try again in an 1 min' },
        validate: { trustProxy: true },
      });

export default limiter;
