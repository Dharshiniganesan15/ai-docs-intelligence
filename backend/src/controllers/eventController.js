import Joi from 'joi';
import { processEvent } from '../services/eventProcessor.js';

const schema = Joi.object({
  eventType: Joi.string().valid('push', 'pull_request', 'release').required(),
  repository: Joi.string().required(),
  owner: Joi.string().required(),

  commitSha: Joi.string().allow('', null),
  prNumber: Joi.number().allow(null),
  releaseTag: Joi.string().allow('', null),

  actor: Joi.string().allow('', null),
  timestamp: Joi.string().allow('', null),

  diff: Joi.string().allow('', null),
  changedFiles: Joi.array().items(Joi.string()).default([]),
  commitMessages: Joi.array().items(Joi.string()).default([]),
  prDescription: Joi.string().allow('', null),
  releaseNotes: Joi.string().allow('', null)
}).required();

export async function processEventHandler(req, res, next) {
  try {
    const payload = await schema.validateAsync(req.body, { abortEarly: false, stripUnknown: true });
    const result = await processEvent(payload);
    return res.json({ ok: true, ...result });
  } catch (err) {
    return next(err);
  }
}
