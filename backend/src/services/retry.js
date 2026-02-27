import { setTimeout as sleep } from 'node:timers/promises';

export async function withRetry(fn, { retries = 3, minDelayMs = 500, maxDelayMs = 4000 } = {}) {
  let lastErr;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await fn({ attempt });
    } catch (err) {
      lastErr = err;
      if (attempt >= retries) break;

      const backoff = Math.min(maxDelayMs, minDelayMs * 2 ** attempt);
      const jitter = Math.floor(Math.random() * 200);
      await sleep(backoff + jitter);
    }
  }

  throw lastErr;
}
