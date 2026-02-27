import { env } from '../config/env.js';
import { AiOperation } from '../models/AiOperation.js';
import { EventLog } from '../models/EventLog.js';
import { generateWithGemini } from './geminiClient.js';
import {
  buildDocUpdatePrompt,
  buildPrSummaryPrompt,
  buildReleaseNotesPrompt
} from './prompts.js';

function shouldIgnoreInfiniteLoop({ actor, commitMessages }) {
  if (!actor) return false;
  if (actor !== env.infiniteLoopGuardActor) return false;
  const needle = env.infiniteLoopGuardCommitContains;
  return (commitMessages || []).some((m) => typeof m === 'string' && m.includes(needle));
}

export async function processEvent(payload) {
  const startedAt = new Date();

  const {
    eventType,
    repository,
    owner,
    commitSha,
    prNumber,
    releaseTag,
    actor,
    timestamp,
    diff,
    changedFiles,
    commitMessages,
    prDescription,
    releaseNotes
  } = payload;

  const event = await EventLog.create({
    eventType,
    repository,
    owner,
    commitSha,
    prNumber,
    releaseTag,
    actor,
    timestamp: timestamp ? new Date(timestamp) : undefined,
    status: 'received'
  });

  if (shouldIgnoreInfiniteLoop({ actor, commitMessages })) {
    await EventLog.updateOne({ _id: event._id }, { status: 'processed' });
    return { ignored: true };
  }

  try {
    if (eventType === 'push') {
      const prompt = buildDocUpdatePrompt({ diff, changedFiles });
      const { text } = await generateWithGemini(prompt);

      const finishedAt = new Date();
      await AiOperation.create({
        eventType,
        repository,
        owner,
        commitSha,
        actor,
        status: 'success',
        geminiModel: env.geminiModel,
        promptType: 'doc_update',
        inputSize: (diff || '').length,
        outputSize: (text || '').length,
        startedAt,
        finishedAt,
        result: { documentationUpdate: text }
      });

      await EventLog.updateOne({ _id: event._id }, { status: 'processed' });
      return { documentationUpdate: text };
    }

    if (eventType === 'pull_request') {
      const prompt = buildPrSummaryPrompt({ diff, changedFiles, prDescription });
      const { text } = await generateWithGemini(prompt);

      const finishedAt = new Date();
      await AiOperation.create({
        eventType,
        repository,
        owner,
        prNumber,
        actor,
        status: 'success',
        geminiModel: env.geminiModel,
        promptType: 'pr_summary',
        inputSize: (diff || '').length,
        outputSize: (text || '').length,
        startedAt,
        finishedAt,
        result: { prSummary: text }
      });

      await EventLog.updateOne({ _id: event._id }, { status: 'processed' });
      return { prSummary: text };
    }

    if (eventType === 'release') {
      const prompt = buildReleaseNotesPrompt({ commitMessages, releaseNotes });
      const { text } = await generateWithGemini(prompt);

      const finishedAt = new Date();
      await AiOperation.create({
        eventType,
        repository,
        owner,
        releaseTag,
        actor,
        status: 'success',
        geminiModel: env.geminiModel,
        promptType: 'release_notes',
        inputSize: JSON.stringify(commitMessages || []).length,
        outputSize: (text || '').length,
        startedAt,
        finishedAt,
        result: { releaseNotes: text }
      });

      await EventLog.updateOne({ _id: event._id }, { status: 'processed' });
      return { releaseNotes: text };
    }

    await EventLog.updateOne({ _id: event._id }, { status: 'failed', errorMessage: 'unsupported_eventType' });
    return { error: 'unsupported_eventType' };
  } catch (err) {
    const finishedAt = new Date();
    await AiOperation.create({
      eventType,
      repository,
      owner,
      commitSha,
      prNumber,
      releaseTag,
      actor,
      status: 'failure',
      errorMessage: err.message,
      geminiModel: env.geminiModel,
      promptType:
        eventType === 'push' ? 'doc_update' : eventType === 'pull_request' ? 'pr_summary' : 'release_notes',
      inputSize: (diff || '').length,
      outputSize: 0,
      startedAt,
      finishedAt
    });

    await EventLog.updateOne({ _id: event._id }, { status: 'failed', errorMessage: err.message });
    throw err;
  }
}
