import winston from 'winston';
import { env } from '../config/env.js';

const jsonFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

export const logger = winston.createLogger({
  level: env.logLevel,
  format: jsonFormat,
  transports: [new winston.transports.Console()]
});
