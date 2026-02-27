import { Router } from "express";

import { requireBearerAuth } from "./middleware/auth.js";
import { rateLimit } from "./middleware/rateLimit.js";
import { processEventHandler } from "./controllers/eventController.js";
import { logErrorHandler } from "./controllers/errorController.js";
import {
  getMetrics,
  listEvents,
  listOperations,
  getUsage,
} from "./controllers/dashboardController.js";

export const router = Router();

router.get("/health", (req, res) => res.json({ ok: true }));

router.post(
  "/api/process-event",
  rateLimit,
  requireBearerAuth,
  processEventHandler,
);
router.post("/api/log-error", rateLimit, requireBearerAuth, logErrorHandler);

router.get("/api/dashboard/metrics", rateLimit, getMetrics);
router.get("/api/dashboard/events", rateLimit, listEvents);
router.get("/api/dashboard/operations", rateLimit, listOperations);
router.get("/api/dashboard/usage", rateLimit, getUsage);
