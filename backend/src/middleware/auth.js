import { env } from '../config/env.js';

export function requireBearerAuth(req, res, next) {
  const header = req.header('authorization') || '';
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || token !== env.apiAuthBearer) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  return next();
}
