import dotenv from 'dotenv';

dotenv.config();

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3001),

  mongodbUri: required('MONGODB_URI'),

  geminiApiKey: required('GEMINI_API_KEY'),
  geminiModel: process.env.GEMINI_MODEL || 'gemini-1.5-pro',

  githubToken: required('GITHUB_TOKEN'),

  apiAuthBearer: required('API_AUTH_BEARER'),

  docUpdatePath: process.env.DOC_UPDATE_PATH || 'README.md',

  infiniteLoopGuardActor: process.env.INFINITE_LOOP_GUARD_ACTOR || 'github-actions[bot]',
  infiniteLoopGuardCommitContains: process.env.INFINITE_LOOP_GUARD_COMMIT_CONTAINS || '[skip ci]',

  logLevel: process.env.LOG_LEVEL || 'info'
};
