import { EventLog } from "../models/EventLog.js";
import { AiOperation } from "../models/AiOperation.js";

export async function getMetrics(req, res, next) {
  try {
    const [eventsTotal, eventsFailed, opsTotal, opsFailed] = await Promise.all([
      EventLog.countDocuments({}),
      EventLog.countDocuments({ status: "failed" }),
      AiOperation.countDocuments({}),
      AiOperation.countDocuments({ status: "failure" }),
    ]);

    return res.json({
      events: {
        total: eventsTotal,
        failed: eventsFailed,
        success: eventsTotal - eventsFailed,
      },
      aiOperations: {
        total: opsTotal,
        failed: opsFailed,
        success: opsTotal - opsFailed,
      },
    });
  } catch (err) {
    return next(err);
  }
}

export async function listEvents(req, res, next) {
  try {
    const limit = Math.min(Number(req.query.limit || 50), 200);
    const items = await EventLog.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return res.json({ items });
  } catch (err) {
    return next(err);
  }
}

export async function listOperations(req, res, next) {
  try {
    const limit = Math.min(Number(req.query.limit || 50), 200);
    const items = await AiOperation.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return res.json({ items });
  } catch (err) {
    return next(err);
  }
}

export async function getUsage(req, res, next) {
  try {
    const days = Math.min(Number(req.query.days || 7), 90);
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const pipeline = [
      { $match: { createdAt: { $gte: since } } },
      {
        $group: {
          _id: { promptType: "$promptType", status: "$status" },
          count: { $sum: 1 },
          inputTotal: { $sum: { $ifNull: ["$inputSize", 0] } },
          outputTotal: { $sum: { $ifNull: ["$outputSize", 0] } },
        },
      },
      { $sort: { "._id.promptType": 1, "._id.status": 1 } },
    ];

    const byPromptAndStatus = await AiOperation.aggregate(pipeline);

    return res.json({
      windowDays: days,
      since,
      byPromptAndStatus,
    });
  } catch (err) {
    return next(err);
  }
}
