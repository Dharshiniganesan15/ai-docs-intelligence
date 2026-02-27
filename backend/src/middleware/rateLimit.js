import { RateLimiterMemory } from 'rate-limiter-flexible';

const limiter = new RateLimiterMemory({
  points: 120,
  duration: 60
});

export async function rateLimit(req, res, next) {
  try {
    const key = req.ip || 'unknown';
    await limiter.consume(key, 1);
    return next();
  } catch {
    return res.status(429).json({ error: 'rate_limited' });
  }
}
