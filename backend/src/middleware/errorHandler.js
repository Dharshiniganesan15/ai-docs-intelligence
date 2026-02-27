import { logger } from '../utils/logger.js';

export function errorHandler(err, req, res, next) {
  logger.error('request_failed', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  return res.status(500).json({ error: 'internal_error' });
}
