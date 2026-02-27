import Joi from 'joi';
import { EventLog } from '../models/EventLog.js';

const schema = Joi.object({
  eventType: Joi.string().required(),
  repository: Joi.string().required(),
  commitSha: Joi.string().allow('', null),
  timestamp: Joi.string().allow('', null),
  error: Joi.string().required(),
  workflowRun: Joi.string().allow('', null)
}).required();

export async function logErrorHandler(req, res, next) {
  try {
    const payload = await schema.validateAsync(req.body, { abortEarly: false, stripUnknown: true });

    await EventLog.create({
      eventType: payload.eventType,
      repository: payload.repository,
      owner: payload.repository.split('/')[0] || 'unknown',
      commitSha: payload.commitSha,
      timestamp: payload.timestamp ? new Date(payload.timestamp) : undefined,
      status: 'failed',
      errorMessage: payload.error
    });

    return res.json({ ok: true });
  } catch (err) {
    return next(err);
  }
}
