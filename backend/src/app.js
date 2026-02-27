import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { env } from "./config/env.js";
import { connectDb } from "./config/db.js";
import { logger } from "./utils/logger.js";

import { errorHandler } from "./middleware/errorHandler.js";

import { router } from "./routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json({ limit: "2mb" }));
app.use(morgan("combined"));

app.use(express.static(path.join(__dirname, "../public")));

app.use(router);

app.use(errorHandler);

await connectDb();

app.listen(env.port, () => {
  logger.info("server_started", { port: env.port, nodeEnv: env.nodeEnv });
});
